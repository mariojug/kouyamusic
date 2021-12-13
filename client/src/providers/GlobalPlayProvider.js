import { GlobalPlayContext } from "../contexts";
import React from "react";

const GlobalPlayProvider = ({ children }) => {
  const [playArray, setPlayArray] = React.useState([]);

  return (
    <GlobalPlayContext.Provider value={{ playArray, setPlayArray }}>
      {children}
    </GlobalPlayContext.Provider>
  );
};

export default GlobalPlayProvider;
