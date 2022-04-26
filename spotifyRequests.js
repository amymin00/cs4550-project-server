import axios from 'axios';
import qs from 'qs';

// let token = '';

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
        // console.log(response.data.access_token);
        return response.data.access_token;
    } catch (err) {
        console.log(err);
    }
};

export const searchForSongs = async query => {
    const parsedQuery = query.toLowerCase().replaceAll('-', '%20');

    const trackSearchUri = `http://api.spotify.com/v1/search?q=${parsedQuery}&type=track`;
    // console.log(`api song search uri: ${trackSearchUri}`);

    const token = await getToken();

    try {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };
        const { data } = await axios.get(trackSearchUri, { headers });
        // console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
};

// const wrapInRetry = (apiCallFunc) => {
//     return async (...args) => {
//         try {
//             const response = await apiCallFunc(args);
//             return response;
//         } catch (err) {
//             if (err.response.status === 401) {
//                 try {
//                     // store new token in application memory via global variable
//                     token = await getToken();
//                     const response = await apiCallFunc(args);
//                     return response;
//                 } catch (innerErr) {
//                     console.log(innerErr);
//                 }
//             } else {
//                 console.log(err);
//             }
//         }
//     };
// };

// wrapInRetry(searchForSongs);