import AppLayout from "@/layouts/app-layout";
import Domain from "@/pages/auth/domain";
import ForgotPassword from "@/pages/auth/forgot-password";
import Login from "@/pages/auth/login";
import SignUp from "@/pages/auth/sign-up";
import Dashboard from "@/pages/dashboard/dashboard";
import Location from "@/pages/dashboard/location";
import Editor from "@/pages/editor/editor";
import Logout from "@/pages/misc/logout";
import PageNotFound from "@/pages/misc/page-not-found";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Domain />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/editor",
    element: <Editor />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/app/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/app/location",
        element: <Location />,
      },
      {
        path: "/app/report",
        element: <div>report</div>,
      },
      {
        path: "/app/settings",
        element: <div>settings</div>,
      },
      {
        path: "/app/support",
        element: <div>Support</div>,
      },
      {
        path: "/app/docs",
        element: <div>Docs</div>,
      },
      {
        path: "/app/customers-add",
        element: <div>add customers</div>,
      },
      {
        path: "/app/customers-config",
        element: <div>config customers</div>,
      },
      {
        path: "/app/customers-view",
        element: <div>view customers</div>,
      },
      {
        path: "/app/customers-add",
        element: <div>add customers</div>,
      },
      {
        path: "/app/customers-config",
        element: <div>config customers</div>,
      },
      {
        path: "/app/customers-view",
        element: <div>view customers</div>,
      },
      {
        path: "/app/fleet-add",
        element: <div>add fleet</div>,
      },
      {
        path: "/app/fleet-config",
        element: <div>config fleet</div>,
      },
      {
        path: "/app/fleet-view",
        element: <div>view fleet</div>,
      },
    ],
  },
  {
    element: <Logout />,
    path: "/logout",
  },
  {
    element: <PageNotFound />,
    path: "*",
  },
]);
