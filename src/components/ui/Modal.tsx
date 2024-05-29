import React from "react";
import { createPortal } from "react-dom";
import { Button } from "@aws-amplify/ui-react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg p-6 z-10 shadow-lg">
        {children}
        <Button onClick={onClose} className="mt-4">
          Close
        </Button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
