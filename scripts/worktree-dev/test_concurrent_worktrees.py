#!/usr/bin/env python3
"""Real Docker integration test: isolation, repeatability, ownership and cleanup."""
import concurrent.futures
import hashlib
import json
from pathlib import Path
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[2]


def run(*args, cwd=ROOT, **kwargs):
    return subprocess.run(args, cwd=cwd, text=True, check=True,
                          stdout=subprocess.PIPE, stderr=subprocess.STDOUT, **kwargs).stdout


def cli(root, *args, **kwargs):
    return run(str(root / 'scripts/worktree-dev/talebound-worktree-dev'), *args, cwd=root, **kwargs)


def sql(root, statement):
    return cli(root, 'db', input=statement + '\n')


def main():
    common = Path(run('git', 'rev-parse', '--path-format=absolute', '--git-common-dir').strip())
    parent = common.parent.parent / 'worktrees'
    parent.mkdir(exist_ok=True)
    temporary = Path(tempfile.mkdtemp(prefix='verify-worktree-dev-', dir=parent))
    roots = [temporary / 'a', temporary / 'b']
    foreign = None
    try:
        for root in roots:
            run('git', 'worktree', 'add', '--detach', str(root), 'HEAD')
            shutil.copytree(ROOT / 'scripts/worktree-dev', root / 'scripts/worktree-dev', dirs_exist_ok=True)
            shutil.copyfile(ROOT / '.gitignore', root / '.gitignore')
        with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
            list(pool.map(lambda root: cli(root, 'setup', '--services-only'), roots))
        states = [json.loads((root / '.talebound/state.json').read_text()) for root in roots]
        a, b = states
        assert a['project'] != b['project'] and a['host'] != b['host']
        assert not set(a['ports'].values()) & set(b['ports'].values())
        assert a['db_password'] != b['db_password'] and a['token_key'] != b['token_key']
        for root, state in zip(roots, states):
            cli(root, 'status')
            public = cli(root, 'status', '--json')
            assert state['db_password'] not in public and state['token_key'] not in public
            for relative in ['.env.worktree', 'backend/app.env.worktree', 'frontend/.env.worktree', '.talebound/state.json']:
                assert (root / relative).stat().st_mode & 0o777 == 0o600
                run('git', 'check-ignore', '--quiet', relative, cwd=root)
            containers = run('docker', 'ps', '-q', '--filter', f"label=com.talebound.identity={state['project']}").split()
            assert len(containers) == 3
            for container in containers:
                obj = json.loads(run('docker', 'inspect', container))[0]
                assert obj['Config']['Labels']['com.talebound.worktree'] == str(root)
                for mappings in obj['NetworkSettings']['Ports'].values():
                    for binding in mappings or []:
                        assert binding['HostIp'] == state['host']
        sql(roots[0], 'CREATE TABLE isolation_marker(value text); INSERT INTO isolation_marker VALUES (\'only-a\');')
        assert 'only-a' in sql(roots[0], 'TABLE isolation_marker;')
        assert 'missing' in sql(roots[1], "SELECT coalesce(to_regclass('isolation_marker')::text, 'missing');")
        run('docker', 'exec', f"{a['project']}-redis-1", 'redis-cli', 'set', 'isolation', 'only-a')
        assert run('docker', 'exec', f"{b['project']}-redis-1", 'redis-cli', 'get', 'isolation').strip() == ''
        env_before = {rel: hashlib.sha256((roots[0] / rel).read_bytes()).hexdigest()
                      for rel in ['.env.worktree', 'backend/app.env.worktree', 'frontend/.env.worktree']}
        cli(roots[0], 'setup', '--services-only')
        assert json.loads((roots[0] / '.talebound/state.json').read_text()) == a
        assert all(hashlib.sha256((roots[0] / rel).read_bytes()).hexdigest() == value for rel, value in env_before.items())
        assert 'only-a' in sql(roots[0], 'TABLE isolation_marker;')
        cli(roots[0], 'down')
        assert 'ready' in sql(roots[1], "SELECT 'ready';")
        cli(roots[0], 'setup', '--services-only')
        assert 'only-a' in sql(roots[0], 'TABLE isolation_marker;')
        # A foreign volume sharing the Compose project must block destructive cleanup.
        foreign = f"{a['project']}_foreign-test"
        run('docker', 'volume', 'create', '--label', f"com.docker.compose.project={a['project']}", foreign)
        refused = subprocess.run([str(roots[0] / 'scripts/worktree-dev/talebound-worktree-dev'), 'down', '--purge-data'],
                                 text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
        assert refused.returncode != 0 and 'ownership labels do not match' in refused.stdout
        assert 'only-a' in run('docker', 'exec', f"{a['project']}-postgres-1", 'psql',
                               '-U', 'root', '-d', 'talebound', '-c', 'TABLE isolation_marker;')
        run('docker', 'volume', 'rm', foreign)
        foreign = None
        cli(roots[0], 'down', '--purge-data')
        assert not run('docker', 'volume', 'ls', '-q', '--filter', f"label=com.talebound.identity={a['project']}").strip()
        assert 'ready' in sql(roots[1], "SELECT 'ready';")
        print('PASS: concurrent setup, distinct DB/Redis/hosts/ports/keys, private ignored env files, repeatability, stop/restart persistence, ownership refusal, and scoped purge.')
    finally:
        if foreign:
            run('docker', 'volume', 'rm', foreign)
        for root in roots:
            if (root / '.talebound/state.json').exists():
                cli(root, 'down', '--purge-data')
            if root.exists():
                # Only these newly-created disposable checkouts are removed.
                run('git', 'worktree', 'remove', '--force', str(root))
        temporary.rmdir()


if __name__ == '__main__':
    try:
        main()
    except subprocess.CalledProcessError as error:
        print(error.stdout)
        raise
