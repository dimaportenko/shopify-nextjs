import { ensureStartsWith, removeDomainFromUrl } from '@/lib/utils';

describe('ensureStartsWith', () => {
  it('should return the original string if it already starts with the given prefix', () => {
    expect(ensureStartsWith('https://example.com', 'https://')).toBe('https://example.com');
  });

  it('should add the prefix if the string does not start with it', () => {
    expect(ensureStartsWith('example.com', 'https://')).toBe('https://example.com');
  });

  it('should work with empty strings', () => {
    expect(ensureStartsWith('', 'https://')).toBe('https://');
  });
});

describe('removeDomainFromUrl', () => {
  it('should remove http domain from URL', () => {
    expect(removeDomainFromUrl('http://example.com/path')).toBe('/path');
  });

  it('should remove https domain from URL', () => {
    expect(removeDomainFromUrl('https://example.com/path')).toBe('/path');
  });

  it('should handle URLs without paths', () => {
    expect(removeDomainFromUrl('https://example.com')).toBe('');
  });

  it('should not modify URLs without domains', () => {
    expect(removeDomainFromUrl('/path/to/resource')).toBe('/path/to/resource');
  });
});
