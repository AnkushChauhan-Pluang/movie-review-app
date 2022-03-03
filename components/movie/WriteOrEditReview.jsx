import FormField from '@components/common/FormField';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { Form, Formik } from 'formik';
import { mutate } from 'swr';

const WriteOrEditReview = ({ movieId, alreadyReviewed }) => {
  const { loginState } = useAuthContext();

  const writeOrEdit = alreadyReviewed ? 'Edit' : 'Write';
  const username = loginState.user && loginState.user.username;

  const writeReview = (review) => {
    return axios.post(
      `/api/reviews`,
      { username, movieId, review },
      { headers: { Authorization: `Bearer ${loginState.token}` } }
    );
  };

  const editReview = (review) => {
    return axios.patch(
      `/api/reviews/${movieId}`,
      { review },
      { headers: { Authorization: `Bearer ${loginState.token}` } }
    );
  };

  const writeOrEditReview = ({ review }, { resetForm }) => {
    if (review === '') return;
    // console.log(review, movieId);
    !alreadyReviewed
      ? writeReview(review)
          .then(() => {
            resetForm();
            mutate(`/api/reviews?movieId=${movieId}`);
          })
          .catch((e) => {
            const { message } = e.response.data;
            dispatch({ type: 'OPEN_TOAST', text: `${message}`, variant: 'error' });
          })
      : editReview(review)
          .then(() => {
            resetForm();
            mutate(`/api/reviews?movieId=${movieId}`);
          })
          .catch((e) => {
            const { message } = e.response.data;
            dispatch({ type: 'OPEN_TOAST', text: `${message}`, variant: 'error' });
          })
  };

  return (
    <div className="my-6 rounded border p-6 shadow-md">
      <h3 className="mb-4 text-xl font-bold">{writeOrEdit} your review</h3>
      <Formik initialValues={{ review: '' }} onSubmit={writeOrEditReview}>
        {() => (
          <Form>
            <FormField
              type="text"
              name="review"
              placeholder="Write your review here..."
            />
            <button
              type="submit"
              className="mt-4 rounded bg-black px-5 py-2 text-sm font-semibold text-white"
            >
              {writeOrEdit} review
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default WriteOrEditReview;
