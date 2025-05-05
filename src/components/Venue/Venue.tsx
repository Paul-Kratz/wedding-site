import Image from "next/image";
import { Container, Grid } from "@mui/material";
import styles from "./Venue.module.css";

export const Venue = () => {
  return (
    <Container maxWidth="md">
      <Grid container spacing={2} className={styles.venueRow}>
        <Grid size={{ xs: 12, md: 6 }} className={styles.venueImageCol}>
          <Image
            src="/juniper-barns.webp"
            alt="Juniper Barns"
            fill
            objectFit="cover"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} className={styles.venueInfoCol}>
          <h3 className={styles.venueTitle}>Juniper Barn</h3>
          <p>Newpark, Ballymote, Co.Sligo, F56 E033</p>
          <a
            className="buttonStyle"
            href="https://www.juniperbarn.ie/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check it out
          </a>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2338.6968545906457!2d-8.464554322878715!3d54.1145767725221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485ebfa0e61cc767%3A0x1995445642d104f2!2sJuniper%20Barn!5e0!3m2!1sen!2sie!4v1744693251679!5m2!1sen!2sie"
            width={"100%"}
            height="300"
            className={styles.venueMap}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Grid>
      </Grid>
    </Container>
  );
};
