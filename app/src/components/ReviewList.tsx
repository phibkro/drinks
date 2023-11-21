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
      className={`flex w-[40em] flex-col items-center justify-center border-2 ${className}`}
    >
      <p className="my-4 text-xl">Did other people like this cocktail?</p>
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

const martiniGlasses: number[] = [1, 2, 3, 4, 5];

export function ReviewListItem(review: { comment: string; rating: number }) {
  return (
    <div
      className="my-4 flex w-[29em] flex-col border-t-2 py-2"
      data-cy="reviewListItem"
    >
      <div className="my-2 flex flex-row justify-center">
        {martiniGlasses.map((glass) =>
          glass <= review.rating ? (
            <Martini color={ratedColor} key={glass} data-cy="ratedMartini" />
          ) : (
            <Martini key={glass} data-cy="unratedMartini" />
          ),
        )}
      </div>
      <div>
        <p>{review.comment}</p>
      </div>
    </div>
  );
}
