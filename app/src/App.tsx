import { HomeIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <div className="flex min-h-screen flex-col gap-5 p-8">
      <header>
        <nav className="flex justify-between">
          <Link to={import.meta.env.BASE_URL}>
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
