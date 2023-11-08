import DrinkDetails from "@/components/DrinkDetails";
import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";
import { GET_DRINK_BY_ID, GET_REVIEW_BY_DRINKID } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

export default function DetailsPage() {
  const { drinkId } = useParams();
  const {
    loading: loadingDrink,
    error: errorDrink,
    data: dataDrink,
  } = useQuery(GET_DRINK_BY_ID, {
    variables: { id: Number(drinkId) },
  });
  const {
    loading: loadingReviews,
    error: errorReviews,
    data: dataReviews,
  } = useQuery(GET_REVIEW_BY_DRINKID, {
    variables: { drinkId: Number(drinkId) },
  });
  if (dataReviews) {
    console.log("reviews", dataReviews.reviewsByDrinkId[0]);
  }
  console.log(dataDrink);
  return (
    <main className="flex flex-col gap-8">
      {loadingDrink && <p>Loading...</p>}
      {errorDrink && <p>Error : {errorDrink.message}</p>}
      {dataDrink && (
        <>
          <DrinkDetails {...dataDrink.drinkById} />
          <ReviewForm
            drinkId={dataDrink.drinkById.id}
            className="self-center"
          />
          {loadingReviews && <p>Loading...</p>}
          {errorReviews && <p>Error : {errorReviews.message}</p>}
          {dataReviews && (
            <ReviewList
              drinkId={dataDrink.drinkById.id}
              className="self-center"
              reviews={dataReviews.reviewsByDrinkId}
            />
          )}
        </>
      )}
    </main>
  );
}
