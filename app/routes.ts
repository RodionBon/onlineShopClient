import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("layouts/mainLayout.tsx", [
    route("productList", "pages/productListPage.tsx"),
  ])
] satisfies RouteConfig;
