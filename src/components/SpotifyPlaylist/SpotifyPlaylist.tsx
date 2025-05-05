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
const formatDuration = (duration_ms: number) => {
  const minutes = Math.floor(duration_ms / 60000);
  const seconds = Math.floor((duration_ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const SpotifyPlaylist = ({
  playlist,
}: {
  playlist: SpotifyApi.PlaylistObjectFull;
}) => {
  return (
    <>
      <SpotifySearchBar />
      <TableContainer>
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
            {playlist?.tracks?.items.map((row, index) => (
              <TableRow
                key={row?.track?.id}
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
                      src={row?.track?.album?.images[0]?.url as string}
                      alt={row?.track?.album?.name as string}
                      width={50}
                      height={50}
                    />
                    <Box ml={2}>
                      <Link
                        href={row?.track?.external_urls?.spotify as string}
                        target="_blank"
                        underline="hover"
                        style={{ textDecorationColor: "white" }}
                      >
                        <Typography className={styles.rowText}>
                          {row?.track?.name}
                        </Typography>
                      </Link>
                      <Link
                        href={
                          row?.track?.artists?.[0]?.external_urls
                            ?.spotify as string
                        }
                        target="_blank"
                        underline="hover"
                        style={{ textDecorationColor: "white" }}
                      >
                        <Typography className={styles.rowTextSmaller}>
                          {row?.track?.artists
                            ?.map((artist) => artist.name)
                            .join(", ")}
                        </Typography>
                      </Link>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell size="small" width={25}>
                  <Typography className={styles.rowText}>
                    {row?.track?.duration_ms
                      ? formatDuration(row?.track?.duration_ms)
                      : "00:00"}{" "}
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
