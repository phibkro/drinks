import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const rootPath = import.meta.env.BASE_URL;
export const appRouter = createBrowserRouter([
  {
    path: rootPath,
    element: <App />,
  },
]);
