import { Martini } from "lucide-react";
import { ratedColor } from "./ReviewForm";

const martiniGlasses: number[] = [1, 2, 3, 4, 5];

function ReviewListItem(review: { comment: string; rating: number }) {
  return (
    <div className="my-[0.5em] flex w-[29em] flex-col border-t-2 py-[0.5em]">
      <div className="my-[0.5em] flex flex-row justify-center">
        {martiniGlasses.map((glass) =>
          glass <= review.rating ? (
            <Martini
              color={ratedColor}
              className="hover:cursor-pointer"
              key={glass}
            />
          ) : (
            <Martini className="hover:cursor-pointer" key={glass} />
          ),
        )}
      </div>
      <div>
        <p>{review.comment}</p>
      </div>
    </div>
  );
}

export default ReviewListItem;
