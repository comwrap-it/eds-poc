import styled from "@emotion/styled";
import * as Styles from "../libs/common/styles"

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width:100%;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: bold;

  &.selected {
    border-bottom: 4px solid rgba(196, 21, 28, 1);
    //font-family: ${Styles.GlobalStyleVariables.widgetVariablesStyle["$bold"]};
    font-weight: 600;
    color: rgba(25, 58, 86, 1);
  }

  &:hover {
    cursor: pointer;
  }
`;

export const Icon = styled.img`
  height: 40px;
  width: 40px;
`;

export const Label = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 24px;
  text-transform: capitalize;
`;
