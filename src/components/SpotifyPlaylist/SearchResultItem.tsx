import { CircularProgress, Typography } from "@mui/material";
import styles from "./SpotifySearchBar.module.css";
import Image from "next/image";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import app from "@/utils/firebase";
import { useState } from "react";

export const SearchResultItem = ({
  option,
}: {
  option: SpotifyApi.TrackObjectFull;
}) => {
  const [inPlaylist, setInPlaylist] = useState(false);
  const [loading, setLoading] = useState(false);
  const addToPlaylist = async (track: SpotifyApi.TrackObjectFull) => {
    setLoading(true);
    const rsvpUser: { name: string } | null = JSON.parse(
      localStorage.getItem("rsvp") || "null"
    );
    const totalSuggestions = Number(localStorage.getItem("totalSuggestions"));
    if (totalSuggestions >= 5) {
      alert("You have reached the maximum number of suggestions.");
      setLoading(false);
      return;
    }
    const data = {
      name: track.name,
      artist: track.artists.map((artist) => artist.name).join(", "),
      url: track.external_urls.spotify,
      user: rsvpUser?.name ?? "unknown",
    };
    const message = {
      to: "+3530862040052",
      body: `${rsvpUser?.name ?? "Someone"} added ${
        track.name
      } by ${track.artists.map((artist) => artist.name).join(", ")} (${
        track.external_urls.spotify
      }) to the playlist`,
    };
    try {
      const db = getFirestore(app);
      await addDoc(collection(db, "music"), data);
      await addDoc(collection(db, "messages"), message);
      localStorage.setItem("totalSuggestions", String(totalSuggestions + 1));
      setInPlaylist(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div key={option.id} className={styles.resultItem}>
      <div className={styles.trackDetails}>
        <Image
          src={option?.album?.images[0]?.url as string}
          alt={option?.album?.name as string}
          width={50}
          height={50}
          className={styles.resultImage}
        />
        <Typography variant="body1">
          {option.name} -{" "}
          {option.artists?.map((artist) => artist.name).join(", ")}
        </Typography>
      </div>
      <button
        className={styles.addButton}
        onClick={() => addToPlaylist(option)}
        disabled={inPlaylist || loading}
      >
        {loading && (
          <CircularProgress size={20} sx={{ position: "absolute" }} />
        )}
        {inPlaylist ? "Added" : "Add"}
      </button>
    </div>
  );
};
