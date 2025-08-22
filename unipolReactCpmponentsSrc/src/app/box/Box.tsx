import React from "react";
import { BoxContainer, Icon, Label } from "./Box.style";
import classNames from "classnames";

import { MAPPING_ADB } from "../PreventivatoreSticky.data";
import { IconMappingAmbitiPU } from "../libs/common/restyling-pu.utils";

const Box = (props: any) => {
  const { adb, selected, setADBSelected, getCardConfig,useMock } = props;
  const entityCode = adb?.entityKey?.code;

  const changeADBSelected = () => {
    if(!useMock) getCardConfig(adb?.entityKey?.code)
    setADBSelected(adb)
  };
  
  const formattedName = MAPPING_ADB.NAME[entityCode as keyof typeof MAPPING_ADB.NAME] ;
  const iconName = MAPPING_ADB.ICON[entityCode as keyof typeof MAPPING_ADB.ICON];
  const iconPath = selected
    ? IconMappingAmbitiPU.bicolor[iconName as keyof typeof IconMappingAmbitiPU.bicolor]
    : IconMappingAmbitiPU.positive[iconName as keyof typeof IconMappingAmbitiPU.positive];

  return (
    <BoxContainer
      onClick={() => changeADBSelected()}
      className={classNames({
        selected: selected,
      })}
    >
      <Icon alt={formattedName} src={iconPath} />
      <Label>{formattedName}</Label>
    </BoxContainer>
  );
};

export default Box;
