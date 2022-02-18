import Tooltip from '@components/ui/Tooltip';
import { TrashIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { mutate } from 'swr';

const ReviewListItem = ({ reviewItem }) => {
  const { _id, author, edited, movieId, review } = reviewItem;
  const { loginState } = useAuthContext();
  const loggedInUser = loginState.user && loginState.user.username;
  const isCurrentUser = loggedInUser === author;

  const deleteReview = () => {
    axios
      .delete(`/api/movie/${movieId}/reviews/${_id}`, {
        headers: { Authorization: `Bearer ${loginState.token}` },
      })
      .then(() => mutate(`/api/movie/${movieId}/reviews`))
      .catch((e) => console.log(e));
  };

  return (
    <div className="mx-10 flex items-center justify-between rounded border p-6 shadow-md">
      <div className="">
        <h3>
          A review by <strong>{author}</strong>
          <span className="ml-2 text-sm text-neutral-500">
            {edited && '(edited)'}
          </span>
        </h3>
        <p>{review}</p>
      </div>
      {isCurrentUser && (
        <div className="flex gap-4">
          <button
            className="group relative rounded-full p-2 hover:bg-neutral-200"
            onClick={deleteReview}
          >
            <TrashIcon height={20} width={20} />
            <Tooltip text="Delete review" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewListItem;
