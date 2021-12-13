import React from "react";
import { CartContext, GlobalPlayContext, SrcContext } from "../contexts";

export const useCart = () => React.useContext(CartContext);
export const useGlobalPlay = () => React.useContext(GlobalPlayContext);
export const useSrc = () => React.useContext(SrcContext);
