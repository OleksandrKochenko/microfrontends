import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VendorPage from "./vendor-page.component";

const router = createBrowserRouter([
  {
    path: "/vendors/:vendorId",
    element: <VendorPage />,
  },
  {
    path: "/vendors",
    element: <VendorPage />,
  },
]);

export default function Root(_props: Record<string, unknown>) {
  return <RouterProvider router={router} />;
}
