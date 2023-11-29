import { ADD_REVIEW, GET_REVIEW_BY_DRINKID } from "@/lib/queries";
import { useMutation } from "@apollo/client";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { Martini } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import { RadioGroup } from "./ui/RadioGroup";
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
    refetchQueries: [
      GET_REVIEW_BY_DRINKID, // DocumentNode object parsed with gql
      "ReviewsByDrinkId", // Query name
    ],
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
    <div
      className={`${className}
        mx-10 flex  h-80 
        w-[40em] max-w-full flex-col
        items-center justify-center gap-4
      `}
    >
      <p className="text-xl">{"Thank you for submitting a review <3"}</p>
    </div>
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="reviewForm"
      className={`${className}
        mx-10 flex  h-80 
        w-[40em] max-w-full flex-col
        items-center justify-center gap-4
      `}
    >
      <h2 className="text-center text-xl">Give this cocktail a review!</h2>

      <RadioGroup aria-labelledby="Rate it" className="flex flex-row">
        {ratingRange.map((i) => (
          <RadioGroupItem
            aria-labelledby={`rating-group-item-${i}_label`}
            value={`${i}`}
            onFocus={() => setRating(i)}
            key={i}
          >
            <Label id={`rating-group-item-${i}_label`}>{i}</Label>
            <Martini
              color={i <= rating ? ratedColor : "currentColor"}
              onClick={() => setRating(i)}
              className="hover:cursor-pointer"
              key={i}
              aria-label="Martini glass icon"
            />
          </RadioGroupItem>
        ))}
      </RadioGroup>
      <Label id="textarea_label">What do you think?</Label>
      <Textarea
        placeholder="Did you like your cocktail?"
        {...register("comment", {
          required: {
            value: true,
            message: "Please add a comment before submitting you review",
          },
          minLength: {
            value: 1,
            message: "Please write more before submitting",
          },
          maxLength: {
            value: 280,
            message: "Please use less than 280 characters",
          },
          pattern: {
            value: /(.|\s)*\S(.|\s)*/,
            message: "You need more than spaces in your review",
          },
        })}
        className="max-w-full bg-gray-200 text-black"
        rows={8}
        cols={50}
        aria-labelledby="textarea_label"
      ></Textarea>
      {errors.comment ? (
        //Error if user doesnt leave comment when reviewing drink
        <span>{errors.comment.message}</span>
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
