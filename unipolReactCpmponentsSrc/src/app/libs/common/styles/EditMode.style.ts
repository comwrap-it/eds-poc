export const Container = `
    width: 100%;
    height: 100%;
    border: 1px solid #b9b9b9;

    :hover:not(body[isediting="true"] &) {
        cursor: pointer;
        border: 1px solid #8E8B8B;
        box-shadow: 0px 0px 4px rgba(1, 53, 99, 0.2);
    }

    &.isEditable {
        border: 2px solid #013563;
    }

    .editing_description_label {
        position: absolute;
        margin-top: -22px;
        padding: 4px 8px;
        background-color: #023563;
        color: white;
        border-radius: 6px 6px 0 0;
        margin-left: -2px;
        font-weight: 800;
        font-size: 12px;
        line-height: 14px;
        font-family: Unipol Medium;
        text-transform: none;
    }

    .editing_toolbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        margin-bottom: 0;
        background: #f0f0f0;
        padding: 8px 16px;
        border: 1px solid #d4d4d4;
        z-index: 10;
    }

    .editing_buttons {
        display: flex;
        justify-content: flex-end;
        height: 33px;
        align-items: center;
        position: relative;
        flex-wrap: wrap;
        margin-left: auto;
        gap: 8px;

        button {
            width: 100px;
            padding-top: 5px;
            border-radius: 4px;
            cursor: pointer;
            width: 96px;
            height: 100%;
            font-size: 14px;
            font-weight: 700;
            line-height: 17px;
        }
    
        .editing_undo {
            color: #013563;
            background-color: transparent;
            border: none;
            font-family: Unipol Medium;
        }
    
        .editing_save {
            color: #ffffff;
            background-color: #013563;
            font-family: Unipol Medium;
        }
    }

  `;

export const editModeIconHeight = 25;
export const EditModeIconsContainerStyle = `
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  gap: 5px;
  min-height: 100px;
  z-index: 105;
`;

export const visibilityMaskStyle = `
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: .5;
  z-index: 104;
`;

const editModeIcon = (iconUrl: string) => {
  return `
    position: relative;
    width: ${editModeIconHeight}px;
    height: ${editModeIconHeight}px;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    z-index: 105;
  
    &:after {
      content: url("${iconUrl}");
      display: block;
      width: ${editModeIconHeight}px;
      height: ${editModeIconHeight}px;
    }

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 8px;
    }
  `;
};
export const PrimarySettingsIcon = editModeIcon(
  "/NextAssets/icons/settings.svg"
);
export const DeleteIcon = editModeIcon("/NextAssets/icons/delete.svg");
export const PrimaryVisibilityIcon = (imgUrl: string) => editModeIcon(imgUrl);
export const VisualizationSettingsIcon = editModeIcon(
  "/NextAssets/icons/view.svg"
);

export const listItemSettingIcon = PrimarySettingsIcon;

export const listItemDeleteIcon = DeleteIcon;

export const listItemVisualizationSettingsIcon = VisualizationSettingsIcon;
