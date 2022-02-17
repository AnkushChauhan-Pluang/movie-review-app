import FormField from '@components/common/FormField';
import axios from 'axios';
import { useAuthContext } from 'contexts/AuthContext';
import { Form, Formik } from 'formik';
import { mutate } from 'swr';

const WriteOrEditReview = ({ movieId, alreadyReviewed }) => {
  const { loginState } = useAuthContext();

  const writeOrEdit = alreadyReviewed ? 'Edit' : 'Write';
  const author = loginState.user && loginState.user.username;

  const writeReview = async (review) => {
    const res = await axios.post(
      `/api/movie/${movieId}/reviews/write`,
      { author, movieId, review },
      { headers: { Authorization: `Bearer ${loginState.token}` } }
    );
    console.log('write res =>', res);
  };

  const editReview = async (review) => {
    const res = await axios.patch(
      `/api/movie/${movieId}/reviews/${author}`,
      { movieId, review },
      { headers: { Authorization: `Bearer ${loginState.token}` } }
    );
    console.log('edit res =>', res);
  };

  const writeOrEditReview = async ({ review }, { resetForm }) => {
    if (review === '') return;
    try {
      console.log(review, movieId);
      !alreadyReviewed ? writeReview(review) : editReview(review);
      resetForm();
      mutate(`/api/movie/${movieId}/reviews`);
    } catch (e) {
      console.log('error', e);
    }
  };

  return (
    <div className="mx-10 my-6 rounded border p-6 shadow-md">
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
