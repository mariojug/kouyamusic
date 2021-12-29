import React from "react";
import {
  CartContext,
  GlobalPlayContext,
  ModalContext,
  SrcContext,
} from "../contexts";

export const useCart = () => React.useContext(CartContext);
export const useGlobalPlay = () => React.useContext(GlobalPlayContext);
export const useSrc = () => React.useContext(SrcContext);
export const useModal = () => React.useContext(ModalContext);

const exports = { useCart, useGlobalPlay, useSrc, useModal };
export default exports;
