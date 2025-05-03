import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import MainContent from "../components/MainContent";
import classes from "./index.module.css";
import { Section } from "@/components/Section/Section";
import { Rsvp } from "@/components/RSVP/Rsvp";
import Script from "next/script";
import { FAQItems } from "@/components/FAQ/FAQItems";
import { TimelineSection } from "@/components/Timeline/Timeline";
import Head from "next/head";
import { Venue } from "@/components/Venue/Venue";
import { getSpotifyAccessToken, getSpotifyPlaylist } from "@/functions/spotify";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>Steph & Paul&apos;s Wedding</title>
        <meta
          name="description"
          content="Steph & Paul are getting married! Join us for a day of love and celebration."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />{" "}
      </Head>
      <div className={classes.root}>
        <Script src="https://open.spotify.com/embed/iframe-api/v1" async />
        <MainContent />
        <div className="container">
          <Section>
            <div className={classes.textArea}>
              Welcome to our wedding website here you can see all the
              information you might need to celebrate with us & RSVP. We love
              you all and we cannot wait to share this day with you. <br />{" "}
              <br />
              Love Steph & Paul xx
            </div>
          </Section>
          <Section title="Countdown to our wedding">
            <CountdownTimer />
          </Section>
          <Section title="RSVP">
            <Rsvp />
          </Section>
          <Section title="FAQs">
            <FAQItems />
          </Section>
          <Section title="The Venue">
            <Venue />
          </Section>
          <Section title="Timeline">
            <TimelineSection />
          </Section>
          <Section title="Music">
            <Typography
              variant="h5"
              style={{ fontFamily: "var(--font-petit-formal-script)" }}
            >
              Coming soon
            </Typography>
          </Section>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const accessToken = await getSpotifyAccessToken();
  const playlist = await getSpotifyPlaylist({ accessToken });
  return {
    props: {
      playlist,
    },
  };
};
