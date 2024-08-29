import { Outlet } from "react-router-dom";
import { Button } from "./components/ui/button";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
