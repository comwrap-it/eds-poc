export function pageLayoutHpOnly(style: string): string {
  return `
    .wpthemeUnipol & {
      ${style}
    }
  `;
}

export function pageLayout1ColumnOnly(style: string): string {
  return `
    .wptheme1Col & {
      ${style}
    }
  `;
}
