import { useEffect } from "react";
import { PLAYLIST_ID } from "@/constants/spotify";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";

declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: {
      createController: (
        ref: HTMLElement | null,
        config: Record<string, string>,
        callback: () => void
      ) => void;
    }) => void;
  }
}
export type PlaylistItem = {
  added_at: string;
  added_by: {
    id: string;
    name: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color: string | null;
  track: {
    album: {
      external_urls: {
        spotify: string;
      };
      images: Array<{
        height: number;
        url: string;
        width: number;
      }>;
      name: string;
      type: string;
      uri: string;
    };
    artists?: Array<{
      external_urls?: {
        spotify?: string;
      };
      href?: string;
      id?: string;
      name?: string;
      uri?: string;
    }>;
    duration_ms?: number | null | undefined;
    external_urls?: {
      spotify?: string;
    };
    href?: string;
    id?: string;
    name?: string;
    type?: "track" | "episode";
    uri?: "spotify" | "spotify";
  };
};
export type SpotifyPlaylist = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{
    height: number;
    url: string;
    width: number;
  }>;
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
    items: PlaylistItem[];
  };
  type: string;
  uri: string;
};

export const SpotifyPlaylist = ({
  playlist,
}: {
  playlist: SpotifyPlaylist;
}) => {
  useEffect(() => {
    const element = document.getElementById("spotify-playlist");

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const callback = () => {};
      IFrameAPI.createController(
        element,
        {
          uri: `spotify:playlist:${PLAYLIST_ID}`,
          width: "100%",
          height: "400px",
        },
        callback
      );
    };
  }, []);
  function formatDuration(duration_ms: number): import("react").ReactNode {
    const minutes = Math.floor(duration_ms / 60000);
    const seconds = Math.floor((duration_ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Album</TableCell>
            <TableCell>
              <AccessTime />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playlist?.tracks?.items.map((row: PlaylistItem, index: number) => (
            <TableRow
              key={row.track.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>
                <Box display={"flex"} flexDirection="row" ml={2}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={row.track.album.images[0].url}
                    alt={row.track.album.name}
                    style={{ width: 50, height: 50 }}
                  />
                  <Box ml={2}>
                    <Typography variant="body2">{row.track.name}</Typography>
                    <Typography variant="subtitle2">
                      {row.track.artists
                        ?.map((artist) => artist.name)
                        .join(", ")}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>{row.track.album.name}</TableCell>
              <TableCell>
                {row.track.duration_ms
                  ? formatDuration(row.track.duration_ms)
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
