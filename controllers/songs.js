import { findSong, searchForSongs } from "../spotifyRequests.js";

const findSongById = async (req, res) => {
    const data = await findSong(req.params.id);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(data);
};

const findSongs = async (req, res) => {
    const data = await searchForSongs(req.params.query);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(data);
};

export default app => {
    app.get('/api/songs/:id', findSongById);
    app.get('/api/songs/search/:query', findSongs);
};