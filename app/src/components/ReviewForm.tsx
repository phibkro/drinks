import { Martini } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
const martiniGlasses: number[] = [1, 2, 3, 4, 5];

function ReviewForm({ className }: { className?: string }) {
  //Set 0 as default rating
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewData>();

  const onSubmit: SubmitHandler<ReviewData> = (
    data, //Function for handling form-submitted data
  ) => {
    setSubmitted(true);
    console.log(data, rating);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="reviewForm"
      className={className}
    >
      <div className="flex h-[20em] w-[40em] flex-col items-center justify-center border-2">
        <p className="text-xl">Give this cocktail a review!</p>
        <div className="my-[1em] flex flex-row">
          {martiniGlasses.map((glass) =>
            glass <= rating ? ( //Places all martini glasses for rating
              <Martini
                color={ratedColor}
                onClick={() => setRating(glass)}
                className="hover:cursor-pointer"
                key={glass}
              />
            ) : (
              <Martini
                onClick={() => setRating(glass)}
                className="hover:cursor-pointer"
                key={glass}
              />
            ),
          )}
        </div>
        <textarea
          placeholder="Did you like your cocktail?"
          {...register("comment", { required: true })}
          rows={4}
          cols={50}
          className="my-[0.5em] rounded bg-gray-50 px-[0.2em] text-black"
        ></textarea>
        {errors.comment && (
          //Error if user doesnt leave comment when reviewing drink
          <span>Please add a comment before submitting you review</span>
        )}
        {rating > 0 && (
          //Hides submit button if user havent rated the drink
          <input
            type="submit"
            className="my-[0.5em] h-[2em] w-[5em] border-2 hover:cursor-pointer hover:border-white"
          />
        )}
      </div>
    </form>
  );
}

export default ReviewForm;
