import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { Outlet } from "react-router-dom";
import { Button } from "./components/ui/Button";
import { ModeToggle } from "./components/ui/ModeToggle";

function App() {
  return (
    <div className="flex min-h-screen flex-col gap-5 p-8 lg:px-40 lg:py-8">
      <header className="flex justify-between">
        <Link href="/">
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
