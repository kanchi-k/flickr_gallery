const API_KEY = "4122871f47a04240f409c6faf45fb3f2";

const apiCall = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=birds&per_page=20&format=json&nojsoncallback=1&page=`;

export default apiCall;
