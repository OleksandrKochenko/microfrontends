import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrderPage from "./order-page.component";

const router = createBrowserRouter([
  {
    path: "/orders/:orderId",
    element: <OrderPage />,
  },
  {
    path: "/orders",
    element: <OrderPage />,
  },
]);

export default function Root(_props: Record<string, unknown>) {
  return <RouterProvider router={router} />;
}
