export const toolbarStyle = `
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
