import { HomeIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { ModeToggle } from "./components/ui/ModeToggle";
import { rootPath } from "./router";

function App() {
  return (
    <div className="flex min-h-screen flex-col gap-5 p-8">
      <header>
        <nav className="flex justify-between">
          <Link to={rootPath}>
            <HomeIcon />
          </Link>
          <ModeToggle />
        </nav>
      </header>

      <Outlet />
    </div>
  );
}

export default App;
