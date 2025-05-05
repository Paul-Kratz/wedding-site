import {
  getSpotifyAccessToken,
  getSpotifySearchResults,
} from "@/functions/spotify";


import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { searchTerm } = req.query;
    if (typeof searchTerm !== "string") {
      return res.status(400).json({ message: "Invalid search term" });
    }
    const access_token = await getSpotifyAccessToken();
    const searchResults = await getSpotifySearchResults({
      searchTerm,
      accessToken: access_token,
    });

    return res.json({ searchResults });
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
