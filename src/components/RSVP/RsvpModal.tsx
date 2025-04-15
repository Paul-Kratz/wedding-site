import { Button, Form, Modal } from "react-bootstrap";
import styles from "./RsvpModal.module.css";
import { useState } from "react";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import app from "../../utils/firebase";
export const RsvpModal = ({
  handleClose,
  show,
}: {
  handleClose: () => void;
  show: boolean;
}) => {
  const [names, setNames] = useState("");

  const handleRsvp = async (isAttending: boolean) => {
    const db = getFirestore(app);
    const data = {
      name: names,
      attending: isAttending,
      date: new Date().toISOString(),
    };
    // Initialize the Firebase database with the provided configuration
    await addDoc(collection(db, "rsvp"), data);

    // Add your RSVP handling logic here
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Can we expect to see you on our wedding day?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="rsvp.name">
            <Form.Label>
              Your name (or names if there&apos;s two of you)
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              value={names}
              onChange={(e) => setNames(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleRsvp(false)}>
          Can&apos;t make it
        </Button>
        <Button className={styles.btnGreen} onClick={() => handleRsvp(true)}>
          Will be there
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
