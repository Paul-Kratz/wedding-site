import CountdownTimer from "@/components/CountdownTimer/CountdownTimer";
import MainContent from "../components/MainContent";
import classes from "./index.module.css";
import { Section } from "@/components/Section/Section";
import { Rsvp } from "@/components/RSVP/Rsvp";
import { Button } from "react-bootstrap";
export default function Home() {
  const refreshPlaylist = () => {
    const iframe = document.getElementById(
      "spotify-iframe"
    ) as HTMLIFrameElement | null;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };
  return (
    <div>
      <MainContent />
      <div className="container">
        <Section>
          <div className={classes.textArea}>
            Welcome to our wedding website here you can see all the information
            you might need to celebrate with us & RSVP. We love you all and we
            cannot wait to share this day with you. <br /> <br />
            Love Steph & Paul xx
          </div>
        </Section>
        <Section title="Countdown to our wedding">
          <CountdownTimer />
        </Section>
        <Section title="FAQs">
          <p>This is some content</p>
        </Section>

        <section className={classes.container}>
          <div className={classes.textArea}>
            <h2 className={classes.title}>RSVP</h2>
            <Rsvp />
          </div>
        </section>
        <section className={classes.container}>
          <div className={classes.textArea}>
            <h2 className={classes.title}>The Venue</h2>
            <p className={classes.contactText}></p>
          </div>
        </section>
        <section className={classes.container}>
          <div className={classes.textArea}>
            <h2 className={classes.title}>Accomodation</h2>
            <p className={classes.contactText}></p>
          </div>
        </section>
        <section className={classes.container}>
          <div className={classes.textArea}>
            <h2 className={classes.title}>Timeline</h2>
            <p className={classes.contactText}></p>
          </div>
        </section>
        <section className={classes.container}>
          <div className={classes.textArea}>
            <h2 className={classes.title}>Menu</h2>
            <p className={classes.contactText}></p>
          </div>
        </section>
        <Section title="Music">
          <Button onClick={refreshPlaylist}>Refresh</Button>
          <iframe
            style={{ borderRadius: "12px", marginBottom: "1em" }}
            src="https://open.spotify.com/embed/playlist/64mERjpY6FiXpnAmyIkpFD?utm_source=generator"
            width="100%"
            height="400px"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            id="spotify-iframe"
          ></iframe>
        </Section>
      </div>
    </div>
  );
}
