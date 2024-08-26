export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const removeDomainFromUrl = (url: string): string => {
  return url.replace(/^https?:\/\/[^\/]+/, '');
};
