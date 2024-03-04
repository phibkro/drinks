import { Outlet, createHashRouter } from "react-router-dom";
import App from "./App";
import DetailsPage from "./pages/DetailsPage";
import SearchPage from "./pages/SearchPage";

// For browserRouter
// export const rootPath = import.meta.env.BASE_URL;
// For hashRouter
export const rootPath = "/";
export const appRouter = createHashRouter([
  {
    path: rootPath,
    element: <App />,
    children: [
      {
        path: rootPath,
        element: <SearchPage />,
      },
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
