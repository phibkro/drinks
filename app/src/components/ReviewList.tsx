import React from "react";
import { ReviewData } from "./ReviewForm";
import ReviewListItem from "./ReviewListItem";

const mockReviews: ReviewData[] = [
  {
    reviewId: 0,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum sed",
    rating: 4,
  },
  {
    reviewId: 1,
    comment: "Lorem ipsum dolor sit amet, consectetur",
    rating: 5,
  },
  {
    reviewId: 2,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum sed tortor in tempus. Sed egestas tellus nec nibh lobortis, id porttitor ex blandit. Nam sed ligula orci. Donec dapibus risus",
    rating: 4,
  },
  { reviewId: 3, comment: "Lorem ipsum", rating: 2 },
  {
    reviewId: 4,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas condimentum sed tortor in tempus. Sed egestas tellus nec nibh lobortis, id porttitor ex blandit. Nam sed ligula orci. Donec dapibus risus vel felis ultrices, non aliquam velit sollicitudin. Nullam iaculis erat et mollis bibendum. In mi ex, venenatis vel erat eget, iaculis aliquam neque. Quisque semper faucibus augue id suscipit. Nulla suscipit volutpat sagittis. Nulla venenatis ligula et mauris dignissim accumsan. Praesent a dolor non lectus varius vulputate id non ipsum. Integer quis ante aliquet, imperdiet dui in, euismod felis. Sed eu vulputate sapien.",
    rating: 1,
  },
];

function ReviewList() {
  return (
    <div className="flex flex-col border-t-0 border-2 w-[40em] justify-center items-center">
      <p className="text-xl my-[1em]">Did other people like this cocktail?</p>
      {mockReviews.map((review) => (
        <ReviewListItem
          comment={review.comment}
          rating={review.rating}
          reviewId={review.reviewId}
          key={review.reviewId}
        />
      ))}
    </div>
  );
}

export default ReviewList;
