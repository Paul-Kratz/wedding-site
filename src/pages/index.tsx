import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import MainContent from "../components/MainContent";
import classes from "./index.module.css";
import { Section } from "@/components/Section/Section";
import { Rsvp } from "@/components/RSVP/Rsvp";
import { FAQItems } from "@/components/FAQ/FAQItems";
import { TimelineSection } from "@/components/Timeline/Timeline";
import Head from "next/head";
import { Venue } from "@/components/Venue/Venue";
import { SpotifyPlaylist } from "@/components/SpotifyPlaylist/SpotifyPlaylist";

export default function Home() {
  console.log(
    "%cStop looking at the console. It's not going to help you!",
    "color: #567356; font-size: 20px; font-weight: bold; font-family: 'Playfair Display', serif;"
  );
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
          <Section id="countdown" title="Countdown to our wedding">
            <CountdownTimer />
          </Section>
          <Section id="rsvp" title="RSVP">
            <Rsvp />
          </Section>
          <Section id="faqs" title="FAQs">
            <FAQItems />
          </Section>
          <Section id="the venue" title="The Venue">
            <Venue />
          </Section>
          <Section id="timeline" title="Timeline">
            <TimelineSection />
          </Section>
          <Section
            id="music"
            title="Our Wedding Playlist"
            subtitle="We would love to hear your suggestions for our wedding playlist!"
          >
            <SpotifyPlaylist />
          </Section>
        </div>
      </div>
    </>
  );
}
