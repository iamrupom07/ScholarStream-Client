import { Navigate } from "react-router";

import useRole from "../Hooks/useRole";
import Forbidden from "../Components/Forbidden/Forbidden";

const AdminModeratorRoute = ({ children }) => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return null;

  if (role.role !== "admin" && role.role !== "moderator") {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdminModeratorRoute;
