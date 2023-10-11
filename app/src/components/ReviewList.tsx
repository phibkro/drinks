import * as reviewData from "../data/mockReviews.json";
import ReviewListItem from "./ReviewListItem";

function ReviewList(drink: { drinkId: number }) {
  return (
    <div className="flex w-[40em] flex-col items-center justify-center border-2 border-t-0">
      <p className="my-[1em] text-xl">Did other people like this cocktail?</p>
      {reviewData.reviews
        .filter((review) => review.drinkId === drink.drinkId)
        .map((review) => (
          <ReviewListItem
            comment={review.comment}
            rating={review.rating}
            key={review.reviewId}
          />
        ))}
    </div>
  );
}

export default ReviewList;
