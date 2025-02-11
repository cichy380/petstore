import { removeHtmlTags } from './remove-html-tags';

describe('removeHtmlTags', () => {
  it('should remove HTML tags from a string', () => {
    const input = '<p>This is a <strong>test</strong> string.</p>';
    const output = 'This is a test string.';
    expect(removeHtmlTags(input)).toBe(output);
  });

  it('should return an empty string if input is an empty string', () => {
    const input = '';
    const output = '';
    expect(removeHtmlTags(input)).toBe(output);
  });

  it('should return the same string if there are no HTML tags', () => {
    const input = 'This is a plain text string.';
    const output = 'This is a plain text string.';
    expect(removeHtmlTags(input)).toBe(output);
  });

  it('should handle self-closing tags correctly', () => {
    const input = 'This is a <br/> test string.';
    const output = 'This is a  test string.';
    expect(removeHtmlTags(input)).toBe(output);
  });

  it('should handle nested tags correctly', () => {
    const input = '<div><p>This is a <span>nested</span> test.</p></div>';
    const output = 'This is a nested test.';
    expect(removeHtmlTags(input)).toBe(output);
  });
});
