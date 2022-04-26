import { searchForSongs } from "../spotifyRequests.js";

const findSongs = async (req, res) => {
    const query = req.params.query;
    const data = await searchForSongs(query);
    res.header("Access-Control-Allow-Origin", "*");
    res.json(data);
};

export default app => {
    app.get('/api/songs/search/:query', findSongs);
};