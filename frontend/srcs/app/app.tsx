import React from "react";
import "./app.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import IPongLeadingPage from "../pages/iPongLeadingPage/iPongLeadingPage";
import SignAuth from "../pages/iPongSignAuth/iPongSignAuth";
import AppLayout from "../pages/AppLayout/AppLayout";
import IPongStore from "../pages/iPongStore/iPongStore";
import IPongChat from "../pages/iPongChat/iPongChat";
import Home from "../pages/iPongHome/iPongHome";
import IPongProfile from "../pages/iPongProfile/iPongUserProfile/iPongUserProfile";
import IPongProfileViewAs from "../pages/iPongProfile/iPongUserProfileViewAs/iPongUserProfileViewAs";
import { Navigate } from "react-router-dom";
import api from "../api/posts";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserProfile,
  setSelectedSkinPath,
  setBoardPath,
} from "../state/UserInfo/UserSlice";
import {
  setNotification,
  setNotificationCount,
} from "../state/Notifications/NotificationsSlice";
import { AppDispatch, RootState } from "../state/store";
import { SocketProvider } from "../context/SocketContext";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const RequireAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const dispatch = useDispatch<AppDispatch>();

  if (
    localStorage.getItem("userSkin") === null ||
    localStorage.getItem("userSkin") === undefined
  ) {
    localStorage.setItem("userSkin", "Ice");
  }
  if (
    localStorage.getItem("userBoard") === null ||
    localStorage.getItem("userBoard") === undefined
  ) {
    localStorage.setItem("userBoard", "Tilted Towers");
  }

  const UserSkin = localStorage.getItem("userSkin");
  const UserBoard = localStorage.getItem("userBoard");
  console.log("UserSkin", UserSkin);
  console.log("UserBoard", UserBoard);

  const UpdatedProfileInfo = useSelector(
    (state: RootState) => state.update.UpdateProfile
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/user-profile/me");

        let user = response.data;
        if (
          user.username.startsWith("M-;") ||
          user.username.startsWith("F-;")
        ) {
          user = {
            ...user,
            gender: user.username.startsWith("M-") ? "male" : "female",
          };

          user.username = user.username.split(";")[1];
        }

        dispatch(setUserProfile(user));
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [UpdatedProfileInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/notifications/getAllNotifications");
        const notifications = response.data;

        const NotificationObj = notifications.map((notification) => {
          console.error("notification !!!!!>", notification);
          return {
            receiverId: notification.receiverId,
            RoomId: notification.roomId,
            NotificationId: notification.id,
            senderId: notification.senderId,
            entityType: notification.entityType,
            createdAt: notification.createdAt,
          };
        });

        dispatch(setNotification(NotificationObj));
      } catch (error) {
        console.error("error: notitifications", error);
      }
    };

    const fetchUnreadNotificationsData = async () => {
      try {
        const response = await api.get("/notifications/unreadNotifications");

        dispatch(setNotificationCount(response.data.length));
      } catch (error) {
        console.error("error: notitifications", error);
      }
    };

    fetchData();
    fetchUnreadNotificationsData();
  }, []);

  useEffect(() => {
    dispatch(setSelectedSkinPath(UserSkin));
    dispatch(setBoardPath(UserBoard));
  }, [UserSkin, UserBoard]);

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
        path: "/auth/2fa-login",
        element: <SignAuth path="/auth/2fa-login" />,
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
        element: <Home />,
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
        path: "chat/:chatId",
        element: <IPongChat />,
      },
      {
        path: "store",
        element: <IPongStore />,
      },
      {
        path: "users/:userId",
        element: <IPongProfileViewAs />,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <ChakraProvider>
        <SocketProvider>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              <RouterProvider router={router} />
            </NextThemesProvider>
          </NextUIProvider>
        </SocketProvider>
      </ChakraProvider>
    </>
  );
}
