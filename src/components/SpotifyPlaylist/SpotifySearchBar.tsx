import styles from "./SpotifySearchBar.module.css";
import { useState, type SyntheticEvent } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { RateLimit } from "async-sema";
import { SearchResultItem } from "@/components/SpotifyPlaylist/SearchResultItem";
const limit = RateLimit(2);

export const SpotifySearchBar = () => {
  const [results, setResults] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = async (e: SyntheticEvent<Element, Event>) => {
    setLoading(true);
    try {
      e.preventDefault();
      if (
        !(e.target as HTMLInputElement).value ||
        (e.target as HTMLInputElement).value.length < 3
      ) {
        setResults([]);
        return;
      }
      await limit();
      const results = await fetch(
        `/api/spotify/search?searchTerm=${
          (e.target as HTMLInputElement).value
        }`,
        {
          method: "GET",
        }
      );
      const data = await results.json();
      setResults(data.searchResults.tracks.items);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Autocomplete
        options={results || []}
        freeSolo
        filterOptions={(x) => x}
        sx={{ width: "100%" }}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        onInputChange={(event) => {
          handleInput(event);
        }}
        loading={loading}
        getOptionLabel={() => ""}
        renderOption={(_, option: unknown) => {
          const typedOption = option as SpotifyApi.TrackObjectFull;
          return <SearchResultItem option={typedOption} />;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            className={styles.input}
            placeholder="Search for a song or artist"
            variant="outlined"
          />
        )}
      />
    </>
  );
};
