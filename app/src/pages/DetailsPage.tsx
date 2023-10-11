import DrinkDetails from "@/components/DrinkDetails";
import ReviewForm from "@/components/ReviewForm";
import ReviewList from "@/components/ReviewList";
import * as data from "@/data/M_cocktails.json";
import { transformCocktailDBResult } from "@/lib/utils";
import { useParams } from "react-router-dom";

export default function DetailsPage() {
  const { drinkName } = useParams();
  if (drinkName === undefined) {
    // Should not run as the errorBoundary/errorElement in router.tsx handles it
    return <p>Drinkname is undefined?</p>;
  }
  // instead of using unsafe loaderData
  // Directly fetch from mock data for typesafety
  const drinkData = transformCocktailDBResult(
    data.drinks.filter(
      (drink) => drink.strDrink.toLowerCase() === drinkName.toLowerCase(),
    )[0],
  );
  return (
    <main className="flex flex-col gap-8">
      <DrinkDetails {...drinkData} />
      <ReviewForm className="self-center" />
      <ReviewList drinkId={Number(drinkData.idDrink)} className="self-center" />
    </main>
  );
}
