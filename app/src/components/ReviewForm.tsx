import { SubmitHandler, useForm } from "react-hook-form";
import { Martini } from "lucide-react";
import { useState } from "react";

export type ReviewData = {
  /*
  Type for data submitted through the form
  */
  reviewId: number;
  rating: number;
  comment: string;
};

export const ratedColor = "#eb8634";

let martiniGlasses: number[] = [1, 2, 3, 4, 5];

function ReviewForm() {
  const [rating, setRating] = useState(0); //Set 0 as default rating

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ReviewData>();

  const onSubmit: SubmitHandler<ReviewData> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="reviewForm">
      <div className="flex flex-col border-2 w-[40em] h-[20em] justify-center items-center">
        <p className="text-xl">Give this cocktail a review!</p>
        <div className="flex flex-row my-[1em]">
          {martiniGlasses.map((glass) =>
            glass <= rating ? (
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
          {...register("comment", { minLength: 1 })}
          rows={4}
          cols={50}
          className="bg-gray-50 rounded text-black my-[0.5em] px-[0.2em]"
        ></textarea>
        {errors.comment && (
          <span className=" text-black my-[0.5em] px-[0.2em]">
            Please add a comment before submitting you review
          </span>
        )}
        <input
          type="submit"
          className="border-2 h-[2em] w-[5em] my-[0.5em] hover:cursor-pointer hover:border-white"
        />
      </div>
    </form>
  );
}

export default ReviewForm;
