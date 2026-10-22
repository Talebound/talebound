export function getApiUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? '';
}

export function getRecaptchaSiteKey(): string {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '';
}
