import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./RsvpModal.module.css";
import { useState } from "react";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import app from "../../utils/firebase";
import {
  Alert,
  Box,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Snackbar,
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
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
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
    setIsLoading(true);

    const dietaryRestrictionsWithOther = [
      ...dietaryRestriction,
      ...(otherSelected && otherText ? [otherText] : []),
    ];

    if (!names) {
      setIsLoading(false);
      return;
    }
    const data = {
      name: names,
      attending: isAttending,
      date: new Date().toISOString(),
      dietaryRestrictions: dietaryRestrictionsWithOther,
    };

    const message = {
      to: "+3530862040052",
      body: `RSVP from ${names} - ${
        isAttending ? "Will be there" : "Can't make it"
      }${
        dietaryRestrictionsWithOther.length > 0
          ? `\nDietary Restrictions: ${dietaryRestrictionsWithOther.join(", ")}`
          : ""
      }`,
    };
    try {
      const db = getFirestore(app);
      await addDoc(collection(db, "rsvp"), data);
      await addDoc(collection(db, "messages"), message);
      localStorage.setItem("rsvp", JSON.stringify(data));
      setIsLoading(false);
      setResult("success");
      handleClose();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setResult("error");
    }
  };

  const handleCloseSnackbar = () => {
    setResult(null);
  };
  return (
    <>
      <Dialog open={show} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle
          className={styles.modalTitle}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "none",
          }}
        >
          Can we expect to see you on our wedding day?
          <IconButton aria-label="close" onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={styles.modalBody}>
          {result === "error" && (
            <Alert severity="error">
              Sorry, something went wrong! Please try again.
            </Alert>
          )}
          <ThemeProvider theme={customTheme}>
            <Box display={"flex"} flexDirection="column" gap={2}>
              <TextField
                label="What is your name(s)?"
                variant="standard"
                required
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
        </DialogContent>
        <DialogActions
          className={styles.modalFooter}
          sx={{ justifyContent: "center" }}
        >
          <button
            className="buttonStyle"
            onClick={() => handleRsvp(false)}
            disabled={isLoading}
          >
            Can&apos;t make it
          </button>
          <button
            className="buttonStyleFilled"
            onClick={() => handleRsvp(true)}
            disabled={isLoading}
          >
            Will be there
          </button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={result === "success"}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Thank you for your RSVP!
        </Alert>
      </Snackbar>
    </>
  );
};
