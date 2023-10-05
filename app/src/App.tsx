import { Outlet } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import { ModeToggle } from "./components/mode-toggle";
import viteLogo from "/vite.svg";

function App() {
  return (
    <div className="p-8 flex flex-col gap-5 min-h-screen">
      <header>
        <nav className="flex justify-between">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <ModeToggle />
        </nav>
      </header>

      <Outlet />
    </div>
  );
}

export default App;
