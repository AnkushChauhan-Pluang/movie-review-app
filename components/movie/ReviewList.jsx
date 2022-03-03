import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import useSWR from 'swr';
import ReviewListItem from './ReviewListItem';
import WriteOrEditReview from './WriteOrEditReview';

const ReviewList = ({ movieId }) => {
  const { loginState } = useAuthContext();
  const fetchReviews = (url) => {
    return axios
      .get(url)
      .then(({ data }) => data)
      .catch((e) => {
        const { message } = e.response.data;
        dispatch({ type: 'OPEN_TOAST', text: `${message}`, variant: 'error' });
      })
  };
  const { data: reviews } = useSWR(
    `/api/reviews?movieId=${movieId}`,
    fetchReviews
  );

  const alreadyReviewed =
    loginState.user &&
    reviews &&
    reviews.map((r) => r.username).includes(loginState.user.username);

  const numReviews = reviews ? reviews.length : 0;
  return (
    <div className="mx-10 my-4">
      <h2 className="my-4 text-2xl font-semibold">Reviews ({numReviews})</h2>
      <div className="my-6 flex flex-col gap-6">
        {reviews ? (
          reviews.map((item) => (
            <ReviewListItem key={item._id} reviewItem={item} />
          ))
        ) : (
          <div className="font-medium">Be the first one to write a review</div>
        )}
      </div>
      <WriteOrEditReview movieId={movieId} alreadyReviewed={alreadyReviewed} />
    </div>
  );
};

export default ReviewList;
