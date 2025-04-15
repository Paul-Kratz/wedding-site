import { PLAYLIST_ID } from "@/constants/spotify";

export const getSpotifyAccessToken = async () => {
  const url = "https://accounts.spotify.com/api/token";
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET as string,
  });
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch access token");
  }
  return data.access_token;
};
export const getSpotifyPlaylist = async ({
  playlistId = PLAYLIST_ID,
  accessToken,
}: {
  playlistId?: string;
  accessToken: string;
}) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch playlist");
  }
  const data = await response.json();
  return data;
};
