import {BASE_URL} from '../Config';

const SEARCH_SONGS_BY_ARTIST = '/search?term=Michael+jackson';

export const getSongsList = async () => {
  let response = await fetch(BASE_URL + SEARCH_SONGS_BY_ARTIST);
    let json = await response.json();
    return json;
};
