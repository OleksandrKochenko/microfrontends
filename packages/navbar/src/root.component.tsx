import React from "react";
import { links } from "./root.helper";
import { Link, BrowserRouter } from "react-router-dom";

export default function Root(_props: Record<string, unknown>) {
  return (
    <BrowserRouter>
      <div className="h-16 flex items-center justify-between px-6 bg-primary text-white">
        <div className="flex items-center justify-between">
          {links.map((link) => (
            <Link key={link.href} className="p-6" to={link.href}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </BrowserRouter>
  );
}
