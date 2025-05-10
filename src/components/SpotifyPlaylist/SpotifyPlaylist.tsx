import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import styles from "./SpotifyPlaylist.module.css";
import Image from "next/image";
import { SpotifySearchBar } from "@/components/SpotifyPlaylist/SpotifySearchBar";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import app from "@/utils/firebase";
import { useState, useEffect } from "react";
import type { PlaylistItem } from "@/utils/types";

const formatDuration = (duration_ms: number) => {
  const minutes = Math.floor(duration_ms / 60000);
  const seconds = Math.floor((duration_ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const SpotifyPlaylist = () => {
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchPlaylist = async () => {
      onSnapshot(collection(db, "playlist"), (snapshot) => {
        const playlistData: PlaylistItem[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as PlaylistItem;
          playlistData.push({
            id: doc.id,
            name: data.name,
            artist: data.artist,
            albumArt: data.albumArt,
            duration: data.duration,
            songUrl: data.songUrl,
            artistUrl: data.artistUrl,
            user: data.user,
          });
        });
        playlistData.sort((a, b) => a.name.localeCompare(b.name));
        setPlaylist(playlistData);
      });
    };
    fetchPlaylist();
  }, [db]);

  const checkPlaylist = (id: string) => {
    return playlist.some((song) => song.songUrl === id);
  };
  return (
    <>
      <SpotifySearchBar checkPlaylist={checkPlaylist} />
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell size="small" width={25}>
                <Typography className={styles.titleText}>#</Typography>
              </TableCell>
              <TableCell>
                <Typography className={styles.titleText}>Title</Typography>
              </TableCell>
              <TableCell size="small">
                <Typography className={styles.titleText}>
                  <AccessTime />
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlist?.map((song, index) => (
              <TableRow
                key={song?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" size="small">
                  <Typography className={styles.rowText}>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display={"flex"} flexDirection="row" alignItems="center">
                    <Image
                      src={song?.albumArt}
                      alt={song?.name}
                      width={50}
                      height={50}
                    />
                    <Box ml={2}>
                      <Link
                        href={song.songUrl}
                        target="_blank"
                        underline="hover"
                        style={{ textDecorationColor: "white" }}
                      >
                        <Typography className={styles.rowText}>
                          {song?.name}
                        </Typography>
                      </Link>
                      <Link
                        href={song?.artistUrl}
                        target="_blank"
                        underline="hover"
                        style={{ textDecorationColor: "white" }}
                      >
                        <Typography className={styles.rowTextSmaller}>
                          {song?.artist}
                        </Typography>
                      </Link>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell size="small" width={25}>
                  <Typography className={styles.rowText}>
                    {song?.duration ? formatDuration(song?.duration) : "00:00"}{" "}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
