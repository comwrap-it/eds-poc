import {
  listItemDeleteIcon,
  listItemSettingIcon,
  listItemVisualizationSettingsIcon,
} from "../EditMode.style";

export const listStyle = `
  .list-item-container { 
    position: relative;

    .list-item-settings-icon-container {
      position: absolute;
      top: 0px;
      right: 0px;
      display: flex;

      & > div {
        margin-left: 5px;
        margin-right: 5px;
      }

      .edit-mode-settings-icon {
        ${listItemSettingIcon}
      }
    
      .edit-mode-delete-icon {
        ${listItemDeleteIcon}
      }

      .edit-mode-visualization-settings-icon {
        ${listItemVisualizationSettingsIcon}
      }
    }
  }

  .boilerplate-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #EBEBEB;
    border: 2px solid #363636;
    border-style: dashed;
    cursor: pointer;

    .boilerplate-plus-icon {
      margin-bottom: 12px;
      &:after {
        content: url("/NextAssets/icons/plus.svg");
      }  
    }
    
    .boilerplate-text {
      font-family: Unipol Medium;
      color: #363636;
      font-size: 16px;
    }
  }
`;
