import axios from "axios";
import React from "react";
import { SrcContext } from "../contexts";
import config from "../config";

var API_URL;

if (config.TESTING) {
  API_URL = "http://localhost:8080/api/beatstore";
} else {
  API_URL = "/api/beatstore";
}

const SrcProvider = ({ children }) => {
  const [srcContent, setSrcContent] = React.useState([]);
  const [srcLoaded, setSrcLoaded] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      let expiration = localStorage.kouyaSrcExpire
        ? parseInt(localStorage.kouyaSrcExpire)
        : false;
      if (!expiration || Date.now() >= expiration) {
        loadSrc();
      } else {
        setSrcContent(JSON.parse(localStorage.kouyaSrc));
        setSrcLoaded(true);
      }
    }
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("kouyaSrc", JSON.stringify(srcContent));
    }
  }, [srcContent]);

  const loadSrc = () => {
    axios.get(API_URL + "/load").then((res) => {
      const content = {};
      res.data.map((item, idx) => {
        content[item.id] = {
          audioURL: item.audioURL,
          name: item.name,
          tags: item.tags,
          musicKey: item.key,
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

  const getAudio = async (id) => {
    const URL = API_URL + "/load-item/?type=audio&id=" + id;
    const data = axios.get(URL);
    return await data.then((res) => {
      return { expire: res.headers.expiration, data: res.data };
    });
  };

  const getImage = async (id) => {
    const URL = API_URL + "/load-item/?type=image&id=" + id;
    const data = axios.get(URL);
    return await data.then((res) => {
      return { expire: res.headers.expiration, data: res.data };
    });
  };

  const getFromSrc = (id, query) => {
    try {
      return srcContent[id][query];
    } catch {
      return null;
    }
  };

  const exports = {
    srcContent,
    getAudio,
    getImage,
    getFromSrc,
    loadSrc,
    srcLoaded,
  };

  return <SrcContext.Provider value={exports}>{children}</SrcContext.Provider>;
};

export default SrcProvider;
