import LoadingPage from "@/pages/loadingPage/Loading";
import UnauthorizedPage from "@/pages/unAuthorized/UnAuthorized";
import { useAppSelector } from "@/redux/reduxHook";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const { isUserLogin, user, isUserLoading } = useAppSelector(state => state.auth);

    if (isUserLoading) {
        return <LoadingPage />
    }

    if (isUserLogin === false) {
        return <Navigate to="/auth/login" replace />;

    }


    if (!isUserLogin) {
        return null;
    }

    if (user?.role !== 'admin' || user?.status !== 'active') {
        return <UnauthorizedPage />
    }

    return <Outlet />;
};

export default ProtectedRoutes