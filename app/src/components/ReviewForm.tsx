import { ADD_REVIEW } from "@/lib/queries";
import { useMutation } from "@apollo/client";
import { Martini } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";

//Type for data submitted through the form
export type ReviewData = {
  reviewId: number;
  drinkId: number;
  rating: number;
  comment: string;
};

//Color used for coloring martiniglass rating
export const ratedColor = "#eb8634";

//Array for martini glasses
const ratingRange = [1, 2, 3, 4, 5];

function ReviewForm({
  className,
  drinkId,
}: {
  className?: string;
  drinkId?: number;
}) {
  //Set 0 as default rating
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [addReview] = useMutation(ADD_REVIEW, {
    variables: { drinkId: drinkId, textContent: "", rating: rating },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewData>();

  const onSubmit: SubmitHandler<ReviewData> = (data) => {
    setSubmitted(true);
    addReview({
      variables: {
        drinkId: drinkId,
        textContent: data.comment,
        rating: rating,
      },
    });
  };

  return submitted ? (
    <div className="flex h-[20em] w-[40em] flex-col items-center justify-center self-center border-2">
      <p className="text-xl">{"Thank you for submitting a review <3"}</p>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="reviewForm"
      className={`${className}
      flex h-[20em] w-[40em] flex-col 
      items-center justify-center gap-4
      border-2
      `}
    >
      <p className="text-xl">Give this cocktail a review!</p>
      <div className="flex flex-row">
        {ratingRange.map((i) => (
          <Martini
            color={i <= rating ? ratedColor : "white"}
            onClick={() => setRating(i)}
            className="hover:cursor-pointer"
            key={i}
          />
        ))}
      </div>
      <Textarea
        placeholder="Did you like your cocktail?"
        {...register("comment", { required: true })}
        className="max-w-prose bg-gray-200 text-black"
        rows={4}
        cols={50}
      ></Textarea>
      {errors.comment ? (
        //Error if user doesnt leave comment when reviewing drink
        <span>Please add a comment before submitting you review</span>
      ) : (
        <div className="h-6"></div>
      )}
      {rating > 0 ? (
        //Hides submit button if user havent rated the drink
        <Button variant="default" type="submit">
          Submit review
        </Button>
      ) : (
        <div className="h-10 px-4 py-2"></div>
      )}
    </form>
  );
}

export default ReviewForm;
