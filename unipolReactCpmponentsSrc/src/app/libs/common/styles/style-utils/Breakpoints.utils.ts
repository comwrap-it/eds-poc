export function mobileOnly(style: string): string {
  return `
    @media screen and (max-width: 768px) {
      ${style}
    }
  `;
}

export function tabletOnly(style: string): string {
  return `
    @media screen and (min-width: 769px) and (max-width: 1279px) {
      ${style}
    }
  `;
}

export function desktopOnly(style: string): string {
  return `
    @media screen and (min-width: 1280px) {
      ${style}
    }
  `;
}

export function mobileAndTabletOnly(style: string): string {
  return `
    @media screen and (max-width: 1279px) {
      ${style}
    }
  `;
}

export function tabletAndDesktopOnly(style: string): string {
  return `
    @media screen and (min-width: 769px) {
      ${style}
    }
  `;
}
