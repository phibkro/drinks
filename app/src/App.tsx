import { HomeIcon } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "./components/ui/Button";
import { ModeToggle } from "./components/ui/ModeToggle";
import { rootPath } from "./router";

function App() {
  return (
    <div className="flex min-h-screen flex-col gap-5 p-8">
      <header className="flex justify-between">
        <Link to={rootPath} aria-label="Link to home page">
          <Button variant="outline" size="icon">
            <HomeIcon aria-label="An illustration of a house" />
          </Button>
        </Link>
        <ModeToggle />
      </header>

      <Outlet />
    </div>
  );
}

export default App;
