import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./redux/api/authApi";
import { Toaster } from "sonner";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = localStorage.getItem("login");
    if (load) {
      dispatch(loadUser());
    }
  }, [dispatch]);
  return (
    <>
      <Toaster richColors position="top-center"/>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
