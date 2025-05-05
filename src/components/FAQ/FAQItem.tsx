import type { FAQItemType } from "@/components/FAQ/types";
import { Grid } from "@mui/material";

export const FAQItem = ({ item }: { item: FAQItemType }) => {
  return (
    <Grid size={{ sm: 12, md: 6 }} sx={{ mb: 4 }}>
      <h5 style={{ fontFamily: "var(--font-petit-formal-script)" }}>
        {item.question}
      </h5>
      <p>{item.answer}</p>
    </Grid>
  );
};
