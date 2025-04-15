import { RsvpModal } from "@/components/RSVP/RsvpModal";
import { useState } from "react";
import { Button } from "react-bootstrap";

export const Rsvp = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);
  return (
    <>
      <Button onClick={handleShow}>Are you in?</Button>
      {modalOpen && <RsvpModal handleClose={handleClose} show={modalOpen} />}
    </>
  );
};
