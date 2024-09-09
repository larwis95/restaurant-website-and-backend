type ModalControlPropsType = {
  children: JSX.Element;
  isOpen: boolean;
};

type ModalContentPropsType = {
  children?: JSX.Element | JSX.Element[];
};

type ModalNamespacePropsType = {
  children?: JSX.Element | JSX.Element[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

type ModalHeaderPropsType = {
  children?: JSX.Element | JSX.Element[];
  className?: string;
};

type ModalContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};
