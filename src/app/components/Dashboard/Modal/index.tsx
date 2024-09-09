import { AnimatePresence, motion } from "framer-motion";
import {
  useEffect,
  useContext,
  createContext,
  useState,
  useRef,
  use,
} from "react";
import { cn } from "@/lib/utils";

export const modalContext = createContext<ModalContextType>({
  isOpen: false,
  setIsOpen: (_: boolean) => {},
});

const ModalClose = () => {
  const { setIsOpen } = useContext(modalContext);
  return (
    <button
      className="p-1 ml-auto bg-transparent border-0 text-secondary float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
      onClick={() => setIsOpen(false)}
    >
      <span className="bg-transparent text-secondary h-6 w-6 text-2xl block outline-none focus:outline-none">
        X
      </span>
    </button>
  );
};

const ModalHeader = ({
  children,
  className,
  ...props
}: ModalHeaderPropsType) => {
  return (
    <div
      {...props}
      className={cn(
        "flex p-5 border-b border-border rounded-t gap-3",
        className
      )}
    >
      {children}
    </div>
  );
};

const ModalContent = ({ children }: ModalContentPropsType) => {
  const { isOpen, setIsOpen } = useContext(modalContext);
  const ref = useRef<null | HTMLDivElement>(null);
  const handleClickOutsideModal = (e: MouseEvent) => {
    if (!ref.current) return;

    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal justify-center w-screen h-screen items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black bg-opacity-60 outline-none focus:outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <motion.div
            className="relative w-auto my-6 mx-auto max-w-3xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <div className="border border-border shadow-lg relative flex flex-col w-full bg-slate-700 outline-none focus:outline-none h-fit p-4">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NameSpaceModal = ({
  children,
  isOpen,
  setIsOpen,
}: ModalNamespacePropsType) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  return (
    <modalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </modalContext.Provider>
  );
};

NameSpaceModal.Close = ModalClose;
NameSpaceModal.Header = ModalHeader;
NameSpaceModal.Content = ModalContent;

export default NameSpaceModal;
