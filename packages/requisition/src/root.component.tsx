import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequisitionPage from "./requisition-page.component";

const router = createBrowserRouter([
  {
    path: "/requisitions/:requisitionId",
    element: <RequisitionPage />,
  },
  {
    path: "/requisitions",
    element: <RequisitionPage />,
  }
]);

export default function Root(_props: Record<string, unknown>) {
  return <RouterProvider router={router} />;
}
