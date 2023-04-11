import React from "react";
import * as flags from "react-flags-select";
import utility from "../../utils/utility";

export const Flag = ({ country = "India" }) => {
  const countryCode = utility.countryToCode(country);
  const SelectFlag = flags[countryCode];
  return <SelectFlag />;
};
