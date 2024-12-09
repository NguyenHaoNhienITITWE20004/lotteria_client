import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout';
import { HomeScreen } from './pages/home';
import { ProductList } from './pages/product';
import { CartScreen } from './pages/cart';
import OrderScreen from './pages/order/OrderScreen';
import { LayoutAdmin } from './pages/admin/components/Layout';
import HomeAdminScreen from './pages/admin/features/home/HomeAdminScreen';
import ManageProduct from './pages/admin/features/product/ManageProduct';
import ManageDiscount from './pages/admin/features/discount/ManageDiscount';
import ManageUser from './pages/admin/features/user/ManageUser';

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
  {
    path: '/admin',
    element: <LayoutAdmin />,
    children: [
      {
        path: '',
        element: <HomeAdminScreen />,
      },
      {
        path: 'product',
        element: <ManageProduct />,
      },
      {
        path: 'users',
        element: <ManageUser />,
      },
    ],
  },
]);

export default mainRouter;
