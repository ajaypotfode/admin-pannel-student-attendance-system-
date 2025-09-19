
import LoadingPage from "@/pages/loadingPage/Loading";
import { useAppSelector } from "@/redux/reduxHook";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
    const { isUserLogin, isUserLoading } = useAppSelector(state => state.auth);


  if (isUserLoading) {
        return <LoadingPage />
    }
    

    if (isUserLogin === true) {
        console.log("login user true");
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />
};

export default PublicRoutes