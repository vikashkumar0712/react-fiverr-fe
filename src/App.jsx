import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Footer } from "./components/footer/Footer";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/home/Home";
import { Gigs } from "./pages/gigs/Gigs";
import { Gig } from "./pages/gig/Gig";
import { Orders } from "./pages/orders/Orders";
import { MyGigs } from "./pages/my_gigs/MyGigs";
import { MyFavorites } from "./pages/my_favorites/MyFavorites";
import { Add } from "./pages/add/Add";
import { Messages } from "./pages/messages/Messages";
import { Message } from "./pages/message/Message";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Protected } from "./routes/protected/Protected";
import { Private } from "./routes/private/Private";
import { Public } from "./routes/public/Public";
import { NotFound } from "./pages/not_found/NotFound";
import { SetupAccount } from "./pages/setup_account/SetupAccount";
import { Setup } from "./routes/setup/Setup";
import { VerifyAccount } from "./pages/verify_account/VerifyAccount";
import { ForgotPassword } from "./pages/forgot_password/ForgotPassword";
import { ResetPassword } from "./pages/reset_password/ResetPassword";
import constants from "./common/constants";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
        <Footer />
      </QueryClientProvider>
    );
  };

  const router = createBrowserRouter([
    {
      path: constants.ROUTES.HOME,
      element: <Layout />,
      children: [
        {
          path: constants.ROUTES.HOME,
          element: <Setup Component={<Home />} isAllowedWithLogin={true} />,
        },
        {
          path: constants.ROUTES.GIGS,
          element: <Setup Component={<Gigs />} isAllowedWithLogin={true} />,
        },
        {
          path: constants.ROUTES.GIG_WITH_ID,
          element: <Setup Component={<Gig />} isAllowedWithLogin={true} />,
        },
        {
          path: constants.ROUTES.ORDERS,
          element: <Setup Component={<Private Component={<Orders />} />} />,
        },
        {
          path: constants.ROUTES.MY_GIGS,
          element: <Setup Component={<Protected Component={<MyGigs />} />} />,
        },
        {
          path: constants.ROUTES.MY_FAVORITES,
          element: (
            <Setup
              Component={
                <Protected Component={<MyFavorites />} isSeller={false} />
              }
            />
          ),
        },
        {
          path: constants.ROUTES.ADD,
          element: <Setup Component={<Protected Component={<Add />} />} />,
        },
        {
          path: constants.ROUTES.MESSAGES,
          element: <Setup Component={<Private Component={<Messages />} />} />,
        },
        {
          path: constants.ROUTES.MESSAGE_WITH_ID,
          element: <Setup Component={<Private Component={<Message />} />} />,
        },
        {
          path: constants.ROUTES.LOGIN,
          element: <Public Component={<Login />} />,
        },
        {
          path: constants.ROUTES.REGISTER,
          element: <Public Component={<Register />} />,
        },
        {
          path: constants.ROUTES.SETUP_ACCOUNT,
          element: (
            <Setup
              Component={<Private Component={<SetupAccount />} />}
              isProfileAlreadySetup={true}
            />
          ),
        },
        {
          path: constants.ROUTES.NOT_FOUND,
          element: <Setup Component={<NotFound />} isAllowedWithLogin={true} />,
        },
        {
          path: constants.ROUTES.ACCOUNT_VERIFY_WITH_HASH,
          element: <Public Component={<VerifyAccount />} />,
        },
        {
          path: constants.ROUTES.FORGOT_PASSWORD,
          element: <Public Component={<ForgotPassword />} />,
        },
        {
          path: constants.ROUTES.RESET_PASSWORD_WITH_HASH,
          element: <Public Component={<ResetPassword />} />,
        },
      ],
    },
  ]);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_AUDIENCE}>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={true}
        theme="dark"
      />
    </GoogleOAuthProvider>
  );
}

export default App;
