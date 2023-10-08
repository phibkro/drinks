import React from "react";
import { ReviewData } from "./ReviewForm";
import { Martini } from "lucide-react";

function ReviewListItem({ comment, rating }: ReviewData) {
  return (
    <div className="flex flex-col my-[0.5em] w-[29em]">
      <div className="flex flex-row justify-center my-[0.5em]">
        <Martini />
        <Martini />
        <Martini />
        <Martini />
        <Martini />
      </div>
      <div>
        <p>{comment}</p>
      </div>
    </div>
  );
}

export default ReviewListItem;
