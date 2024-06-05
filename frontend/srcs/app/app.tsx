import React from "react";
import "./app.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import IPongLeadingPage from "../pages/iPongLeadingPage/iPongLeadingPage";
import SignAuth from "../pages/iPongSignAuth/iPongSignAuth";
import AppLayout from "../pages/AppLayout/AppLayout";
import IPongStore from "../pages/iPongStore/iPongStore";
import IPongChat from "../pages/iPongChat/iPongChat";
import IPongGame from "../pages/iPongGame/iPongGame";
import IPongProfile from "../pages/iPongProfile/iPongUserProfile/iPongUserProfile";
import IPongProfileViewAs from "../pages/iPongProfile/iPongUserProfileViewAs/iPongUserProfileViewAs";

import { Navigate } from "react-router-dom";
import api from "../api/posts";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserProfile } from '../state/UserInfo/UserSlice';
import { AppDispatch } from "../state/store";

const RequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/user-profile/me");

        dispatch(setUserProfile(response.data));
 
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <IPongLeadingPage />,
    errorElement: <h1> Not Found </h1>,
  },
  {
    path: "/auth",
    children: [
      {
        path: "/auth/",
        element: <SignAuth path="/auth" />,
      },
      {
        path: "/auth/sign-in",
        element: <SignAuth path="/auth/sign-in" />,
      },
      {
        path: "/auth/create-account",
        element: <SignAuth path="/auth/create-account" />,
      },
      {
        path: "/auth/set-username-picture",
        element: <SignAuth path="/auth/set-username-picture" />,
      },
      {
        path: "/auth/reset-password",
        element: <SignAuth path="/auth/reset-password" />,
      },
      {
        path: "/auth/new-password",
        element: <SignAuth path="/auth/new-password" />,
      },
      {
        path: "/auth/welcome",
        element: <SignAuth path="/auth/welcome" />,
      },
      {
        path: "/auth/verify-email",
        element: <SignAuth path="/auth/verify-email" />,
      },
      {
        path: "/auth/set-password",
        element: <SignAuth path="/auth/set-password" />,
      },
      {
        path: "/auth/verify-reset-code",
        element: <SignAuth path="/auth/verify-reset-code" />,
      },
    ],
  },
  {
    path: "/ipong",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: "home",
        element: <IPongGame />,
      },
      {
        path: "profile",
        element: <IPongProfile />,
      },
      {
        path: "chat",
        element: <IPongChat />,
      },
      {
        path: "store",
        element: <IPongStore />,
      },
      {
        path: "users",
        element: <IPongProfileViewAs />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </>
  );
}
