import { getSpotifyAccessToken, getSpotifyPlaylist } from "@/functions/spotify";
import type { Request, Response } from "express";

const handler = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    const access_token = await getSpotifyAccessToken();
    const playlist = await getSpotifyPlaylist({
      accessToken: access_token,
    });
    return res.json({ playlist });
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
