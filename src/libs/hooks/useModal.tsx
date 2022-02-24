import * as React from "react";
import { ModalContext } from "../context/modalContext";

const useModal = () => {
  const context = React.useContext(ModalContext);

  if (!context) {
    throw new Error("Must use `useModal` within <ModalContextProvider/>");
  }

  return { context, props: { role: "alert" } };
};
export default useModal;
