import { Martini } from "lucide-react";
import { ratedColor } from "./ReviewForm";

export interface ReviewShape {
  textContent: string;
  rating: number;
  id: number;
}
export default function ReviewList({
  className,
  reviews,
}: {
  className: string;
  reviews: ReviewShape[];
}) {
  return (
    <div
      className={`mx-10 flex w-[40em] max-w-full flex-col items-center justify-center border-2 ${className}`}
      data-cy="reviewList"
    >
      <p className="my-4 text-center text-xl">
        Did other people like this cocktail?
      </p>
      {reviews.map((review) => (
        <ReviewListItem
          comment={review.textContent}
          rating={review.rating}
          key={review.id}
        />
      ))}
    </div>
  );
}

const ratingRange: number[] = [1, 2, 3, 4, 5];

export function ReviewListItem(review: { comment: string; rating: number }) {
  return (
    <div
      className="my-2 flex w-[29em] max-w-full flex-col  border-t-2 px-8 py-2"
      data-cy="reviewListItem"
    >
      <div className="my-2 flex flex-row justify-center">
        {ratingRange.map((i) => (
          <Martini
            aria-label="Martini glass icon"
            color={i <= review.rating ? ratedColor : "currentColor"}
            data-cy={i <= review.rating ? "ratedMartini" : "unratedMartini"}
            key={i}
          />
        ))}
      </div>
      <p className="break-words">{review.comment}</p>
    </div>
  );
}
