import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  timelineItemClasses,
  TimelineSeparator,
} from "@mui/lab";
import { useMediaQuery } from "@mui/material";
import { Container } from "@mui/material";

const timelineData = [
  {
    title: "Bus leaves from Markievicz Road",
    date: "2:00 PM",
    description: "The bus will leave from Markievicz Road, please be on time.",
  },
  {
    title: "Bus & guests arrive at the venue",
    date: "2:30 PM",
  },
  {
    title: "Ceremony starts",
    date: "3:00 PM",
    description: "Time to say 'I do'!",
  },
  {
    title: "Drinks reception & canapés",
    date: "3:45 PM",
  },
  {
    title: "Take your seats for dinner",
    date: "6:00 PM",
    description: "Please find your seat at the table!",
  },
  {
    title: "Dinner served",
    date: "6:30 PM",
  },
  {
    title: "Trad band starts playing",
    date: "8:30 PM",
  },
  {
    title: "Music from chaotic playlist starts",
    date: "10:30 PM",
    description: "Please add your song requests to the playlist below!",
  },
  {
    title: "Bus leaves for Markievicz Road",
    date: "12:30 AM",
  },
];
export const TimelineSection = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <Container maxWidth="md">
      <Timeline
        position={isMobile ? "right" : "alternate"}
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            ...(isMobile && {
              flex: 0,
              padding: 0,
            }),
          },
        }}
      >
        {timelineData.map((item) => (
          <TimelineItem key={item.title}>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <h5 style={{ fontFamily: "var(--font-petit-formal-script)" }}>
                {item.title}
              </h5>
              <p>{item.date}</p>
              {item.description && (
                <p
                  style={{
                    fontStyle: "italic",
                    fontSize: "0.9em",
                  }}
                >
                  {item.description}
                </p>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  );
};
