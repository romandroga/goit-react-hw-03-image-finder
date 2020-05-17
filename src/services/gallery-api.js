import axios from 'axios';

const KEY = '15734458-d3f6ccb7088e2e7a90b6df1f7';
const BASE_URL = 'https://pixabay.com/api/?q=';
const PER_PAGE = 'per_page=12';

const fetchImages = (query, pageNumber) => {
  return axios.get(
    `${BASE_URL}${query}&page=${pageNumber}&key=${KEY}&image_type=photo&orientation=horizontal&${PER_PAGE}`,
  );
};

export default fetchImages;
