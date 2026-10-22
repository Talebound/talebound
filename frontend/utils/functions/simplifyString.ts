export function simplifyString(str: string): string {
  // Convert the string to lowercase
  const lowercaseStr = str.toLowerCase();

  // Replace all non-a-z characters (excluding whitespace) with an empty string
  const onlyBasicChars = lowercaseStr.replace(/[^a-z\s-]/g, '');

  // Replace all sequences of whitespace with a single dash
  return onlyBasicChars.replace(/\s+/g, '-');
}
