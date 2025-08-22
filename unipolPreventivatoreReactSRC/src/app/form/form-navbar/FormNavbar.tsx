import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { SubmenuButton, SubmenuContainer } from "./FormNavbar.style";
import { LabelTitle } from "../Form.style";
import { LABELS_FORM } from "../Form.data";
import { IconMappingAmbitiPUColor } from "../../libs/common/restyling-pu.utils";

const FormNavbar = (props: { adb: keyof typeof LABELS_FORM, domains: any, setValue: any, nameOptionSelected: any }) => {
  const { adb, domains, setValue, nameOptionSelected } = props;
  const [subsectionSelected, setsubsectionSelected] = useState(0);
  const bgColor = IconMappingAmbitiPUColor[adb as keyof typeof IconMappingAmbitiPUColor];

  const handleSectionClick = (idx: any) => {
    setsubsectionSelected(idx);
    setValue(nameOptionSelected, domains[idx]);
  };

  useEffect(() => setValue(nameOptionSelected, domains[0]), []);

  const subMenu =
    domains.length > 0 &&
    domains.map((section: any, idx: any) => (
      <SubmenuButton
        key={idx}
        className={classNames({ selected: idx === subsectionSelected })}
        onClick={() => handleSectionClick(idx)}
        colorADB={bgColor}
      >
        {section.label}
      </SubmenuButton>
    ));

  return (
    <>
      <LabelTitle>{LABELS_FORM[adb]}</LabelTitle>
      <SubmenuContainer>{subMenu}</SubmenuContainer>
    </>
  );
};

export default FormNavbar;
