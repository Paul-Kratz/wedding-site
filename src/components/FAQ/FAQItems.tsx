import { FAQItem } from "@/components/FAQ/FAQItem";
import type { FAQItemType } from "@/components/FAQ/types";
import { Container, Grid } from "@mui/material";

export const FAQItems = () => {
  const items: FAQItemType[] = [
    {
      id: 1,
      question: "What time does the ceremony start?",
      answer: (
        <>
          The ceremony starts at 3:00 PM. Please arrive 30 minutes early. For
          more details about the timing on the day, please see the{" "}
          <a className="link-light" href="#timeline">
            Timeline
          </a>{" "}
          below
        </>
      ),
    },
    {
      id: 2,
      question: "When is the RSVP deadline?",
      answer: (
        <>
          Please RSVP by August 5th 2025. You can{" "}
          <a className="link-light" href="#rsvp">
            RSVP
          </a>{" "}
          using the form on this website!
        </>
      ),
    },
    {
      id: 3,
      question: "What is the dress code?",
      answer:
        "The dress code is somewhere between formal and cocktail attire. We recommend a suit or dress shirt and formal trousers for the gents & a cocktail, midi to knee length dress or dressy separates for the ladies. No white dresses please!",
    },
    {
      id: 4,
      question: "Can I bring a plus one?",
      answer:
        "There are no plus ones. Please be aware that your invitation is for the names on the envelope only & we are unable to accommodate any extra guests.",
    },
    {
      id: 5,
      question: "What if I have dietary requirements?",
      answer:
        "When you RSVP, please let us know if you have any dietary requirements and we will do our best to accommodate you. If you have any additional questions, please contact us.",
    },
    {
      id: 6,
      question: "Will the wedding be indoors or outdoors?",
      answer:
        "We are hoping to be able to have the ceremony outdoors, but if the weather is bad we will move it indoors. All of the day will be at the same venue, so you won't have to worry about moving around.",
    },
    {
      id: 7,
      question: "Can we post photos from the day on social media?",
      answer:
        "We would love to see your photos from the day but we do ask not to share any photos of the bride & groom before they have had the chance to share them themselves.",
    },
    {
      id: 8,
      question: "Should we bring gifts?",
      answer:
        "Your presence is the greatest gift, but if you wish to bring something, we would love a contribution towards our honeymoon!",
    },
    {
      id: 9,
      question: "What if I have more questions?",
      answer: (
        <>
          If you have any more questions, please feel free to reach out to us
          via the contact us at{" "}
          <a className="link-light" href="mailto:pskratz25@gmail.com">
            pskratz25@gmail.com
          </a>{" "}
          or give us a text!
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        {items.map((item) => (
          <FAQItem key={item.id} item={item} />
        ))}
      </Grid>
    </Container>
  );
};
