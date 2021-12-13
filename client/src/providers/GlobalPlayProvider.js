import { GlobalPlayContext } from "../contexts";
import React from "react";

const GlobalPlayProvider = ({ children }) => {
  const [playArray, setPlayArray] = React.useState([]);

  const exports = { playArray, setPlayArray };

  return (
    <GlobalPlayContext.Provider value={exports}>
      {children}
    </GlobalPlayContext.Provider>
  );
};

export default GlobalPlayProvider;
