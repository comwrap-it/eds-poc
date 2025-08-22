import styled from "@emotion/styled";
import * as Styles from "../../../libs/common/styles";
const heightInput = 44;
const topDataPicker = heightInput +2;

export const DateInputWrapper = styled.div`
  position: relative;
  display: inline-block;
  //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$normal"]};
  font-family: Helvetica, Arial, sans-serif;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: "relative"
`

export const CurrentYear = styled.span`
  text-decoration: underline;
`

export const Input = styled.input`
  padding: 6px 10px; // Spazio a sinistra
  box-sizing: border-box;
  height: ${heightInput}px;
  font-size: 16px;
  //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$medium"]};
  font-family: Helvetica, Arial, sans-serif;
  border: 1px solid rgb(15, 50, 80);
  outline: none;
  width: 100%;
  text-overflow: ellipsis;
  color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$middle-grey-pu"]};
  
  &:disabled{
    cursor: not-allowed;
    background-color: rgb(240, 240, 240);
    border-color: rgb(241, 241, 241);
    color: rgb(155, 155, 155) !important;
  }
  
  &.error{
    border-color: #FF001F;
  }
  &::placeholder {
      color: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$grey"]};
  }
`;

export const CalendarButton = styled.button`
  position: absolute;
  right: 10px;
  padding: 0;
  width: 24px;
  height: 24px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #555;
`;

export const CalendarPopup = styled.div`
  position: absolute;
  top: ${topDataPicker}px;
  left: 0;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
  box-sizing: border-box;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  text-align: center;
  grid-auto-rows: minmax(30px, auto);
  padding: 5px 0;
`;

export const CalendarHeader = styled.div`
  display: grid;
  //font-family: Unipol Bold;
  font-family: Helvetica, Arial, sans-serif;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  font-weight: bold;
  color: #555;
`;

export const CalendarDay = styled.div<{
  selected: boolean;
  isOtherMonth: boolean;
}>`
  padding: 10px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? "#193a56"
      : "transparent"}; // solo il colore di sfondo per il giorno selezionato
  color: ${(props) =>
    props.isOtherMonth
      ? "#aaa"
      : "#000"}; // Colore del testo per i giorni di altri mesi
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &.selected-day {
    color: #fff;
  }
  &:hover {
    background-color: #f0f0f0;
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MonthBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

export const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #555;
`;

export const MonthYearLabel = styled.span`
  font-size: 16px;
  //font-family: Unipol Bold;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  text-transform: capitalize;
`;

export const YearList = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const YearItem = styled.div<{ selected: boolean }>`
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  //font-family: ${(props) => (props.selected ? "Unipol Bold" : "")};
  font-family: ${(props) => (props.selected ? "Helvetica, Arial, sans-serif" : "")}; 

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const YearsListContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 28px;
`;
