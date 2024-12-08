import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout';
import { HomeScreen } from './pages/home';
import { ProductList } from './pages/product';
import { CartScreen } from './pages/cart';
import OrderScreen from './pages/order/OrderScreen';

const mainRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomeScreen />,
      },
      {
        path: '/products',
        element: <ProductList />,
      },
      {
        path: '/cart',
        element: <CartScreen />,
      },
      {
        path: '/order',
        element: <OrderScreen />,
      },
    ],
  },
]);

export default mainRouter;
