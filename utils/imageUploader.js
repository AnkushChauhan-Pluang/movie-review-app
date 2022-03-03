import axios from 'axios';

const getSignData = () => {
  return axios
    .get('/api/movies/upload')
    .then(({ data }) => {
      return data;
    })
    .catch((e) => {
      const { message } = e.response.data;
      dispatch({ type: 'OPEN_TOAST', text: `${message}`, variant: 'error' });
    })
};

export const uploadImage = (image) => {
  return getSignData()
    .then(({ apiKey, cloudName, signature, timestamp }) => {
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;
      const formData = new FormData();
      formData.append('file', image);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
      formData.append('folder', 'movie_images');

      return axios.post(url, formData);
    })
    .then(({ data: { public_id, secure_url } }) => ({ public_id, secure_url }))
    .catch((e) => {
        const { message } = e.response.data;
        dispatch({ type: 'OPEN_TOAST', text: `${message}`, variant: 'error' });
      })
};
