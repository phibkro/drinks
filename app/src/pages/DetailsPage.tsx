import DrinkDetails from "@/components/DrinkDetails";
import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";
import { GET_DRINK_BY_ID } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

export default function DetailsPage() {
  const { drinkId } = useParams();
  const { loading, error, data } = useQuery(GET_DRINK_BY_ID, {
    variables: { id: Number(drinkId) },
  });
  console.log(data);
  return (
    <main className="flex flex-col gap-8">
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {data && (
        <>
          <DrinkDetails {...data.drinkById} />
          <ReviewForm className="self-center" />
          <ReviewList drinkId={data.drinkById.id} className="self-center" />
        </>
      )}
    </main>
  );
}
