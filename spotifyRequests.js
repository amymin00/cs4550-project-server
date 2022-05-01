import axios from 'axios';
import qs from 'qs';

// let token = '';

export const findSong = async songId => {
    const findTrackUri = `https://api.spotify.com/v1/tracks/${songId}`;
    const token = await getToken();

    try {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const { data } = await axios.get(findTrackUri, { headers });
        return data;
    } catch (err) {
        if (err.response.headers['retry-after']) {
            console.log(`Too many spotify requests! try again after ${err.response.headers['retry-after']} seconds`);
        } else {
            console.log(err.response);
        }
    }
};

export const searchForSongs = async query => {
    const parsedQuery = query.replaceAll('-', '%20');
    const trackSearchUri = `http://api.spotify.com/v1/search?q=${parsedQuery}&type=track&offset=0&limit=10`;
    const token = await getToken();

    try {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const { data } = await axios.get(trackSearchUri, { headers });
        return data;
    } catch (err) {
        console.log(err);
    }
};

const getToken = async () => {
    var clientId = '68da8e6401df4e62b6f5cbe9447e0427'; // Your client id
    var clientSecret = 'e2fb605ff688447fad7a7cb9d06aad1d'; // Your secret

    const headers = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
            username: clientId,
            password: clientSecret,
        },
    };
    const data = {
        grant_type: "client_credentials",
    };

    try {
        const response = await axios.post("https://accounts.spotify.com/api/token",
                                            qs.stringify(data),
                                            headers
                                         );
        return response.data.access_token;
    } catch (err) {
        console.log(err);
    }
};