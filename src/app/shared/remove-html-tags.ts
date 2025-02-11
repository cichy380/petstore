export function removeHtmlTags(data: string): string {
  return data.replace(/<\/?[^>]+(>|$)/g, '');
}
