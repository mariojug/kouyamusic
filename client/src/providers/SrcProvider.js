import axios from "axios";
import React from "react";
import { SrcContext } from "../contexts";

const SrcProvider = ({ children }) => {
  const [srcContent, setSrcContent] = React.useState([]);
  const [srcLoaded, setSrcLoaded] = React.useState(false);

  React.useEffect(() => {
    let expiration = localStorage.kouyaSrcExpire
      ? parseInt(localStorage.kouyaSrcExpire)
      : false;
    if (!expiration || Date.now() >= expiration) {
      loadSrc();
    } else {
      setSrcContent(JSON.parse(localStorage.kouyaSrc));
      setSrcLoaded(true);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("kouyaSrc", JSON.stringify(srcContent));
  }, [srcContent]);

  const loadSrc = () => {
    axios.post("http://localhost:8080/api/beatstore/load").then((res) => {
      localStorage.setItem("kouyaSrcExpire", res.headers.expires);
      const content = {};
      res.data.map((item, idx) => {
        content[item.id] = {
          audioURL: item.audioURL,
          name: item.name,
          tags: item.tags,
          musicKey: item.musicKey,
          bpm: item.bpm,
          coverURL: item.coverURL,
          key: idx,
        };
        return null;
      });
      setSrcContent(content);
      setSrcLoaded(true);
    });
  };

  const getFromSrc = (id, query) => {
    return srcContent[id][query];
  };

  return (
    <SrcContext.Provider value={{ srcContent, getFromSrc, loadSrc, srcLoaded }}>
      {children}
    </SrcContext.Provider>
  );
};

export default SrcProvider;
