import ReviewListItem from './ReviewListItem';

const ReviewList = ({ reviews }) => {
  return (
    <div className="my-6 flex flex-col gap-6">
      {reviews &&
        reviews.map((item) => (
          <ReviewListItem key={item._id} reviewItem={item} />
        ))}
    </div>
  );
};

export default ReviewList;
