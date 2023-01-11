import ax from "../ax";
import React, { createContext, useEffect, useState } from "react";

const LabelContext = createContext();

export const LabelContextProvider = (props) => {
  const [label, setLabel] = useState([]);
  const [loader, setLoader] = useState(true);
  const [selectedLabel, setSelectedLabel] = useState(null);

  return (
    <LabelContext.Provider
      value={{
        label,
        setLabel,
        setLoader,
        loader,
        selectedLabel,
        setSelectedLabel,
      }}
    >
      {props.children}
    </LabelContext.Provider>
  );
};

export default LabelContext;
