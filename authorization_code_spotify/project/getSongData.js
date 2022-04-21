const SpotifyWebApi = require('spotify-web-api-node');


const authorizationCode = '<insert authorization code>';



const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:8888/callback',
    clientId: 'ff88a6f0eaa54c0fa219ef085e0be2a2',
    clientSecret: 'd008595c2e3a4176b25ec6bf82e19beb'
});

spotifyApi
    .authorizationCodeGrant(authorizationCode)
    .then(function(data) {
        console.log('Retrieved access token', data.body['access_token']);

        // Set the access token
        spotifyApi.setAccessToken(data.body['BQDBFpD_Al1qdgVsPUio8xBa_eHriFzvT_Sv2Iz7jKIYS2TjCsOUM_f9v41zLeZ8vJF0ufZH1_tz26PFQmAndj2FVM']);

        // Use the access token to retrieve information about the user connected to it
        return spotifyApi.searchTracks('Love');
    })
    .then(function(data) {
        // Print some information about the results
        console.log('Track Results:' + data.body.tracks.total);

        // Go through the first page of results
        var firstPage = data.body.tracks.items;
        console.log('The tracks in the first page are (popularity in parentheses):');

        /*
         * 0: All of Me (97)
         * 1: My Love (91)
         * 2: I Love This Life (78)
         * ...
         */
        firstPage.forEach(function(track, index) {
            console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
        });
    }).catch(function(err) {
    console.log('Something went wrong:', err.message);
    })
