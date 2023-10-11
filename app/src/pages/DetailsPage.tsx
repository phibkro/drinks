import DrinkDetails from "@/components/DrinkDetails";
import * as data from "@/data/M_cocktails.json";
import { useParams } from "react-router-dom";

export default function DetailsPage() {
  const { drinkName } = useParams();
  if (drinkName === undefined) {
    // Should not run as the errorBoundary/errorElement in router.tsx handles it
    return <p>Drinkname is undefined?</p>;
  }
  // instead of using unsafe loaderData
  // Directly fetch from mock data for typesafety
  const drinkData = data.drinks.filter(
    (drink) => drink.strDrink.toLowerCase() === drinkName.toLowerCase(),
  )[0];
  return (
    <main>
      <DrinkDetails {...drinkData} />
    </main>
  );
}
