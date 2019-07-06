import Dashboard from "./views/Dashboard.jsx";
import Notifications from "./views/Notifications.jsx";
import Icons from "./views/Icons.jsx";
import Typography from "./views/Typography.jsx";
import TableList from "./views/TableList.jsx";
import Maps from "./views/Maps.jsx";
import UserPage from "./views/UserPage.jsx";
import Users from "./views/Users.jsx";
import TenantPage from "./views/TenantPage.jsx";
import TenantsPage from "./views/TenantsPage.jsx";
//import Upgrade from "views/Upgrade.jsx";


var dashRoutes = [
  {
    main: true,
    path: "/meeting",
    name: "Start Meeting",
    icon: "location_world",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "design_image",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "location_map-big",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "ui-1_bell-53",
    component: Notifications,
    layout: "/admin"
  },
  {
    path: "/userpage",
    name: "User Profile",
    icon: "users_single-02",
    component: UserPage,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/users",
    name: "Users",
    icon: "users_single-02",
    component: Users,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "users_single-02",
    component: UserPage,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/tenant/edit/:id?",
    name: "Edit Tenant",
    icon: "users_single-02",
    component: TenantPage,
    layout: "/admin",
    invisible: true,
    action: "Edit"
  },
  {
    path: "/tenant/delete/:id?",
    name: "Delete Tenant",
    icon: "users_single-02",
    component: TenantPage,
    layout: "/admin",
    invisible: true,
    action: "Delete"
  },
  {
    path: "/tenants",
    name: "Tenants",
    icon: "users_single-02",
    component: TenantsPage,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/extended-tables",
    name: "Table List",
    icon: "files_paper",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "design-2_ruler-pencil",
    component: Typography,
    layout: "/admin"
  },
  {
    pro: true,
    path: "/invite",
    name: "Invite a friend",
    icon: "users_single-02",
    component: Typography,
    layout: "/admin"
  }
];
export default dashRoutes;
