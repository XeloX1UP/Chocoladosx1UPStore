"use client";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TransitionsModal({
  children,
  name,
  className,
  isOpen,
  redirect,
  onCloseHandle,
}: {
  children: any;
  name: string | JSX.Element;
  className?: string;
  isOpen?: boolean;
  redirect?: string;
  onCloseHandle?: () => void;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (redirect) router.push(redirect);
    if (onCloseHandle) onCloseHandle();
  };
  useEffect(() => {
    if (isOpen) {
      setOpen(isOpen);
    }
  }, [isOpen]);
  if (typeof name != "string")
    return (
      <div key={`reactRandomKey1`}>
        <button onClick={handleOpen} className={className}>
          {name}
        </button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box className="bg-[var(--bg-100)] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[400px] border-[#000] border-2 shadow-black shadow-md p-4 rounded-md">
              <div className="relative">
                <button
                  onClick={handleClose}
                  className="absolute right-[-15px] sm:right-[-60px] top-[-60px] bg-red-500 py-2 px-4 rounded-full font-bold shadow-md shadow-black"
                  id="btnCloseModal"
                >
                  X
                </button>
                {children}
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  return (
    <div key={`ReactRandomKey2${name}`}>
      <button onClick={handleOpen} className={className}>
        {name}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box className="bg-[var(--bg-100)] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[400px] border-[#000] border-2 shadow-black shadow-md p-4 rounded-md">
            <div className="relative">
              <button
                onClick={handleClose}
                className="absolute right-[-15px] sm:right-[-60px] top-[-60px] bg-red-500 py-2 px-4 rounded-full font-bold"
                id="btnCloseModal"
              >
                X
              </button>
              {children}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
