/** @param {import('webpack').Configuration} config */
function configureSvg(config) {
  const imageRule = config.module?.rules?.find(
    (rule) => typeof rule === 'object' && rule?.test instanceof RegExp && rule.test.test('.svg'),
  );
  if (!imageRule) {
    throw new Error('Expected an image loader before configuring SVG imports');
  }

  config.module.rules.push(
    {
      ...imageRule,
      test: /\.svg$/i,
      resourceQuery: /url/,
    },
    {
      test: /\.svg$/i,
      issuer: imageRule.issuer,
      resourceQuery: { not: [...(imageRule.resourceQuery?.not ?? []), /url/] },
      use: ['@svgr/webpack'],
    },
  );
  imageRule.exclude = /\.svg$/i;

  return config;
}

module.exports = configureSvg;
