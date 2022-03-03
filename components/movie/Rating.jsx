import { useUI } from '@components/ui/uiContext';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { useState } from 'react';
import useSWR from 'swr';

const HoverRating = ({ movieId }) => {
  const { loginState } = useAuthContext();
  const [rating, setRating] = useState(0);
  const { dispatch } = useUI();

  const fetchRating = (url) => {
    return axios
      .get(url, { headers: { Authorization: `Bearer ${loginState.token}` } })
      .then(({ data }) => data && setRating(data.value));
  };
  const { mutate } = useSWR(
    loginState.token ? `/api/ratings/${movieId}` : null,
    fetchRating
  );

  const giveRating = (rating) => {
    if (!loginState.user) return;
    axios
      .post(
        `/api/ratings`,
        { movieId, value: rating },
        { headers: { Authorization: `Bearer ${loginState.token}` } }
      )
      .then(() => {
        dispatch({ type: 'OPEN_TOAST', text: 'Your rating has been saved' });
        mutate();
      })
      .catch((e) => console.log(e.response));
  };

  return (
    <Box
      sx={{
        width: 120,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={rating}
        precision={0.5}
        onChange={(event, newRating) => {
          // console.log(newRating);
          giveRating(newRating);
        }}
        emptyIcon={<StarBorderIcon className="text-white" fontSize="inherit" />}
      />
    </Box>
  );
};

export default HoverRating;
