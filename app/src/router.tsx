import { Outlet, createBrowserRouter } from "react-router-dom";
import * as data from "../../data/m_cocktails.json";
import App from "./App";
import DetailsPage from "./pages/DetailsPage";
import SearchPage from "./pages/SearchPage";

const rootPath = import.meta.env.BASE_URL;
export const appRouter = createBrowserRouter([
  {
    path: rootPath,
    element: <App />,
    children: [
      {
        path: rootPath,
        element: <SearchPage />,
      },
      /* {
        path: "details:drinkId",
        element: <DetailsPage />,
      }, */
      {
        path: "details",
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          {
            path: ":drinkName",
            element: <DetailsPage />,
            loader: async ({ params }) => {
              const drinksWithDrinkName = data.drinks.filter(
                (drink) =>
                  drink.strDrink.toLowerCase() ===
                  params.drinkName?.toLowerCase(),
              );
              if (drinksWithDrinkName.length === 0) {
                throw new Response("Not Found", { status: 404 });
              }
              return new Response(JSON.stringify(drinksWithDrinkName[0]), {
                status: 200,
                headers: {
                  "Content-Type": "application/json; utf-8",
                },
              });
            },
          },
        ],
      },
    ],
  },
]);
