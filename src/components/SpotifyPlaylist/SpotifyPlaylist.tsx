import { useEffect } from "react";
import { PLAYLIST_ID } from "@/constants/spotify";

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

export const SpotifyPlaylist = () => {
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

  return <div id="spotify-playlist" style={{ marginBottom: "3rem" }}></div>;
};
