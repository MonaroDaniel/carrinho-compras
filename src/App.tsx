import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import ProductDetail from "./pages/productDetail/ProductDetail";
import NotFound from "./pages/notFound/NotFound";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/products/:id',
        element: <ProductDetail />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ]
  }
])

export { router };