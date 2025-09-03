import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import { logout } from "../../Redux/Reducer/AdminSlice";
import { useEffect } from "react";

const AdminRoute = () => {
  const admin = useSelector((state) => state.admin.data);
  const dispatch = useDispatch();
    useEffect(() => {
    if (!admin) {
      dispatch(logout());
    }
  }, [admin, dispatch]);

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
