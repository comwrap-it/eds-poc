export const editModeOnly = (style: string): string => {
  return `
    .is-edit-mode-active & {
      ${style}
    }
  `;
};
