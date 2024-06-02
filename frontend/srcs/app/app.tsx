import React from "react";
import "./app.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import IPongLeadingPage from "../pages/iPongLeadingPage/iPongLeadingPage";
import SignAuth from "../pages/iPongSignAuth/iPongSignAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IPongLeadingPage />,
    errorElement: <h1> Not Found </h1>,
  },
  {
    path: "/Auth",
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

/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import ProfilesPage from './pages/ProfilesPage';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/profiles',
    element: <ProfilesPage />,
    children: [
      {
        path: '/profiles/:profileId',
        element: <ProfilePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
*/
