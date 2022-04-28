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

const findSongsById = async (req, res) => {
    const ids = req.body.songs;
    const songs = [];
    await Promise.all(ids.map(async id => {
        const songData = await findSong(id);
        songs.push(songData);
    }));
    res.json(songs);
}

export default app => {
    app.get('/api/songs/id/:id', findSongById);
    app.get('/api/songs/search/:query', findSongs);
    app.post('/api/songs/list', findSongsById);
};