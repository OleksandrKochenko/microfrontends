import { jsx as _jsx } from "react/jsx-runtime";
import { links } from "./root.helper";
import { Link, BrowserRouter } from "react-router-dom";
export default function Root(_props) {
    return (_jsx(BrowserRouter, { children: _jsx("div", { className: "h-16 flex items-center justify-between px-6 bg-primary text-white", children: _jsx("div", { className: "flex items-center justify-between", children: links.map((link) => (_jsx(Link, { className: "p-6", to: link.href, children: link.name }, link.href))) }) }) }));
}
