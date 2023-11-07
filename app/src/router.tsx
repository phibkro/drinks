import { Outlet, createBrowserRouter } from "react-router-dom";
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
            path: ":drinkId",
            element: <DetailsPage />,
          },
        ],
      },
    ],
  },
]);
