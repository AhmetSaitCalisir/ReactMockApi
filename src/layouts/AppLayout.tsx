import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import { useSelector } from "react-redux";

const AppLayout = () => {
  const authUser = useSelector((state: any) => state.auth.authUser);
  return (
    <div className="container">
      <Navbar />
      {authUser ? <Outlet /> : <Navigate to="/login" />}
    </div>
  );
};

export default AppLayout;
