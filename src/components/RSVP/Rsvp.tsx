import { RsvpModal } from "@/components/RSVP/RsvpModal";
import { useState } from "react";

export const Rsvp = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);
  return (
    <>
      <button className="buttonStyle" onClick={handleShow}>
        Are you in?
      </button>
      <RsvpModal handleClose={handleClose} show={modalOpen} />
    </>
  );
};
