const KEY = '21916161-6ae0745b5418f2e7bb34916ca';
const URL = 'https://pixabay.com/api/';
let page = 1;

function fetchImages(req) {
  return fetch(
    `${URL}?q=${req}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(res => res.json());
}

export default { fetchImages };
