import { getSpotifyAccessToken, getSpotifyPlaylist } from "@/functions/spotify";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
