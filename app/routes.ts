import { index, layout, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  layout("layouts/mainLayout.tsx", [
    route("productList", "pages/productListPage/index.tsx"),
    route("account", "pages/accountPage.tsx"),
    route("shoppingCart", "pages/shoppingCartPage/shoppingCartPage.tsx"),
    route("order", "pages/orderPage/orderPage.tsx"),

    route("aboutUs", "pages/infoPages/aboutUsPage.tsx"),
    route("datenSchutz", "pages/infoPages/datenSchutzPage.tsx"),
    route("impressum", "pages/infoPages/impressumPage.tsx"),
  ]),

  layout("layouts/authLayout.tsx", [
    route("signIn", "pages/signInPage.tsx"),
    route("signUp", "pages/signUpPage.tsx"),
  ]),
] satisfies RouteConfig;
