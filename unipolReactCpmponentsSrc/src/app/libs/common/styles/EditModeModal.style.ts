export const ModalBox = `
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 632px;
  max-height: 730px;
  outline: none;
  border-radius: 8px;
`;

export const ModalContentWrapper = `
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

export const FormControlStyled = `
  display: block;
`;

export const ModalTopContent = `
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const ModalCloseIcon = `
  width: 25px;
  cursor: pointer;

  &:after {
    content: url("/NextAssets/icons/cross.svg");
    position: absolute;
    top: 45px;
    right: 40px;
  }
`;

export const ModalTitle = `
  font-size: 25px;
  font-weight: 700;
  line-height: 30px;
  color: #363636;
  line-height: 30px;
`;

export const ButtonRadioWrapper = `
  margin: 32px 0 40px 0;
`;

export const RadioLabel = `
  display: inline-block;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 40px;
  color: #363636;
  font-size: 16px;
  font-weight: 900;
  margin-bottom: 0px;
  line-height: 19px;

  &.checked {
    color: white;
    background-color: #013563;
  }

  &:hover:not(.checked) {
    background-color: rgba(1, 53, 99, 0.04);
  }
`;

export const RadioInput = `
  display: none;
`;

export const CustomForm = `
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const ModalButtonsWrapper = `
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
`;

export const CloseBtn = `
  width: 140px;
  height: 48px;
  padding: 14.5px 0;
  background-color: white;
  border: 1px solid #013563;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  color: #013563;
  text-transform: uppercase;
  line-height: 19px;
  cursor: pointer;

  &:hover {
    background-color: rgba(1, 53, 99, 0.04);
  }
`;

export const SaveBtn = `
  width: 140px;
  height: 48px;
  padding: 14.5px 0;
  background-color: #013563;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  line-height: 19px;
  cursor: pointer;

  &[disabled],
  &:disabled {
    opacity: 0.7;
  }

  &:hover:not(:disabled) {
    background-color: rgba(1, 53, 99, 0.96);
  }
`;
