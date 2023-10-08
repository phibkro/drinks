import { SubmitHandler, useForm } from "react-hook-form";
import { Martini } from "lucide-react";

export type ReviewData = {
  comment: string;
  rating: number;
};

function ReviewForm() {
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
          <Martini />
          <Martini />
          <Martini />
          <Martini />
          <Martini />
        </div>
        <textarea
          placeholder="Did you like your cocktail?"
          {...register("comment")}
          rows={4}
          cols={50}
          className="bg-gray-50 rounded text-black my-[0.5em] px-[0.2em]"
        ></textarea>
        <input type="submit" className="border-2 h-[2em] w-[5em] my-[0.5em]" />
      </div>
    </form>
  );
}

export default ReviewForm;
