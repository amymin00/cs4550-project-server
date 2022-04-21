const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:8888/callback',
    clientId: 'ff88a6f0eaa54c0fa219ef085e0be2a2',
    clientSecret: 'd008595c2e3a4176b25ec6bf82e19beb'
});

// Retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then(function(data) {
        // Set the access token on the API object so that it's used in all future requests
        spotifyApi.setAccessToken(data.body['BQDBFpD_Al1qdgVsPUio8xBa_eHriFzvT_Sv2Iz7jKIYS2TjCsOUM_f9v41zLeZ8vJF0ufZH1_tz26PFQmAndj2FVM']);

        // Get the most popular tracks by David Bowie in Great Britain
        return spotifyApi.getArtistTopTracks('0oSGxfWSnnOXhD2fKuz2Gy', 'GB');
    })
    .then(function(data) {
        console.log('The most popular tracks for David Bowie is..');
        console.log('Drum roll..');
        console.log('...');

        /*
         * 1. Space Oddity - 2009 Digital Remaster (popularity is 51)
         * 2. Heroes - 1999 Digital Remaster (popularity is 33)
         * 3. Let's Dance - 1999 Digital Remaster (popularity is 20)
         * 4. ...
        */
        data.body.tracks.forEach(function(track, index) {
            console.log(
                index +
                1 +
                '. ' +
                track.name +
                ' (popularity is ' +
                track.popularity +
                ')'
            );
        });
    })
    .catch(function(err) {
        console.log('Unfortunately, something has gone wrong.', err.message);
    });