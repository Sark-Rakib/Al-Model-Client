import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./Component/Root.jsx";
import Home from "./Component/Home.jsx";
import AllModel from "./Component/AllModel.jsx";
import AddModel from "./Component/AddModel.jsx";
import Login from "./Component/Login.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import PrivateRoute from "./Component/PrivateRoute.jsx";
import DetailsCard from "./Component/DetailsCard.jsx";
import Loading from "./Component/Loading.jsx";
import UpdateModel from "./Component/UpdateModel.jsx";
import ErrorPage from "./Component/ErrorPage.jsx";
import Register from "./Component/Register.jsx";
import MyModel from "./Component/MyModel.jsx";
import UserProfile from "./Component/UserProfile.jsx";
import MyModelPurchase from "./Component/MyModelPurchase .jsx";
import MyModelDetails from "./Component/MyModelDetails.jsx";
import ViewDetails from "./Component/ViewDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        Component: Home,
        loader: () =>
          fetch("https://ai-model-server-phi.vercel.app/models/latest"),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/allModel",
        Component: AllModel,
        loader: () => fetch("https://ai-model-server-phi.vercel.app/models"),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/addModel",
        Component: AddModel,
      },
      {
        path: "/myModel",
        Component: MyModel,
      },
      {
        path: "/myModel/:id",
        Component: MyModelDetails,
        loader: ({ params }) =>
          fetch(`https://ai-model-server-phi.vercel.app/myModel/${params.id}`),
      },
      {
        path: "/myModelPurchase",
        Component: MyModelPurchase,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },

      {
        path: "/userProfile",
        Component: UserProfile,
      },

      {
        path: "/ViewDetails",
        Component: ViewDetails,
      },
      {
        path: "/detailsCard/:id",
        loader: ({ params }) =>
          fetch(`https://ai-model-server-phi.vercel.app/models/${params.id}`),

        element: (
          <PrivateRoute>
            <DetailsCard></DetailsCard>
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading></Loading>,
      },

      {
        path: "/updateModel/:id",
        Component: UpdateModel,
        hydrateFallbackElement: <Loading></Loading>,
        loader: ({ params }) =>
          fetch(`https://ai-model-server-phi.vercel.app/models/${params.id}`),
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </AuthProvider>
);
