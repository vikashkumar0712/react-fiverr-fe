import "./App.scss";
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/home/Home";
import { Gigs } from "./pages/gigs/Gigs";
import { Gig } from "./pages/gig/Gig";
import { Orders } from "./pages/orders/Orders";
import { MyGigs } from "./pages/my_gigs/MyGigs";
import { Add } from "./pages/add/Add";
import { Messages } from "./pages/messages/Messages";
import { Message } from "./pages/message/Message";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import constants from "./common/constants";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: constants.ROUTES.HOME,
      element: <Layout />,
      children: [
        {
          path: constants.ROUTES.HOME,
          element: <Home />,
        },
        {
          path: constants.ROUTES.GIGS,
          element: <Gigs />,
        },
        {
          path: constants.ROUTES.GIG_WITH_ID,
          element: <Gig />,
        },
        {
          path: constants.ROUTES.ORDERS,
          element: <Orders />,
        },
        {
          path: constants.ROUTES.MY_GIGS,
          element: <MyGigs />,
        },
        {
          path: constants.ROUTES.ADD,
          element: <Add />,
        },
        {
          path: constants.ROUTES.MESSAGES,
          element: <Messages />,
        },
        {
          path: constants.ROUTES.MESSAGE_WITH_ID,
          element: <Message />,
        },
        {
          path: constants.ROUTES.LOGIN,
          element: <Login />,
        },
        {
          path: constants.ROUTES.REGISTER,
          element: <Register />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
