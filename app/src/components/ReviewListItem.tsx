import React from "react";
import { ReviewData } from "./ReviewForm";
import { Martini } from "lucide-react";
import { ratedColor } from "./ReviewForm";

let martiniGlasses: number[] = [1, 2, 3, 4, 5];

function ReviewListItem(
  { comment, rating, reviewId }: ReviewData,
  key: number,
) {
  return (
    <div className="flex flex-col my-[0.5em] w-[29em]">
      <div className="flex flex-row justify-center my-[0.5em]">
        {martiniGlasses.map((glass) =>
          glass <= rating ? (
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
        <p>{comment}</p>
      </div>
    </div>
  );
}

export default ReviewListItem;
