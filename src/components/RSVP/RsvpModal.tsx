import { Button, Modal } from "react-bootstrap";
import styles from "./RsvpModal.module.css";
import { useState } from "react";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import app from "../../utils/firebase";
import {
  Box,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { customTheme } from "@/utils/theme";
const dietaryRestrictions = [
  "Vegetarian",
  "Vegan",
  "Gluten Free",
  "Dairy Free",
  "Nut Allergy",
  "Shellfish Allergy",
];

export const RsvpModal = ({
  handleClose,
  show,
}: {
  handleClose: () => void;
  show: boolean;
}) => {
  const [names, setNames] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [dietaryRestriction, setDietaryRestriction] = useState<string[]>([]);
  const [otherSelected, setOtherSelected] = useState(false);
  const [otherText, setOtherText] = useState("");
  const handleOtherSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setOtherSelected(checked);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setDietaryRestriction((prev) => [...prev, value]);
    } else {
      setDietaryRestriction((prev) =>
        prev.filter((restriction) => restriction !== value)
      );
    }
  };
  const handleRsvp = async (isAttending: boolean) => {
    const db = getFirestore(app);

    const dietaryRestrictionsWithOther = [
      ...dietaryRestriction,
      ...(otherSelected && otherText ? [otherText] : []),
    ];

    const data = {
      name: names,
      attending: isAttending,
      date: new Date().toISOString(),
      dietaryRestrictions: dietaryRestrictionsWithOther,
    };
    await addDoc(collection(db, "rsvp"), data);
    handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header
        closeButton
        className={styles.modalHeader}
        closeLabel="Close"
      >
        <Modal.Title className={styles.modalTitle}>
          Can we expect to see you on our wedding day?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <ThemeProvider theme={customTheme}>
          <Box display={"flex"} flexDirection="column" gap={2}>
            <TextField
              label="What is your name(s)?"
              variant="standard"
              onChange={(e) => setNames(e.target.value)}
            />
            <FormControl>
              <FormLabel>
                <Typography
                  className={styles.dietaryLabel}
                  onClick={() => setExpanded(!expanded)}
                >
                  <span>Dietary Restrictions (Optional)</span>
                  {expanded ? (
                    <KeyboardArrowUpIcon
                      className={styles.dietaryIcon}
                      fontSize="large"
                    />
                  ) : (
                    <KeyboardArrowDownIcon
                      className={styles.dietaryIcon}
                      fontSize="large"
                    />
                  )}
                </Typography>
              </FormLabel>
              <Collapse in={expanded}>
                <RadioGroup defaultValue="none" name="radio-buttons-group">
                  {dietaryRestrictions.map((restriction) => (
                    <FormControlLabel
                      key={restriction.toLowerCase()}
                      value={restriction}
                      control={
                        <Checkbox
                          onChange={handleCheckboxChange}
                          size="small"
                        />
                      }
                      label={
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className={styles.dietaryOptionLabel}
                        >
                          {restriction}
                        </Typography>
                      }
                    />
                  ))}
                  <FormControlLabel
                    value="other"
                    control={
                      <Checkbox onChange={handleOtherSelected} size="small" />
                    }
                    label={
                      <TextField
                        label="Other"
                        variant="standard"
                        size="small"
                        onChange={(e) => setOtherText(e.target.value)}
                        disabled={!otherSelected}
                      />
                    }
                  />
                </RadioGroup>
              </Collapse>
            </FormControl>
          </Box>
        </ThemeProvider>
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button className="buttonStyle" onClick={() => handleRsvp(false)}>
          Can&apos;t make it
        </Button>
        <Button className="buttonStyleFilled" onClick={() => handleRsvp(true)}>
          Will be there
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
