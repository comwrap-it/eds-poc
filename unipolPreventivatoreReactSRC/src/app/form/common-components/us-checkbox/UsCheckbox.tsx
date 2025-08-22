import React, { useState } from "react";
import { CheckBoxContainer } from "./UsCheckBox.style";

const UsCheckbox = ({ label, onChange } : any) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <CheckBoxContainer>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <span>{label}</span>
    </CheckBoxContainer>
  );
};

export default UsCheckbox;
