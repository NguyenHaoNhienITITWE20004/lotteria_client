import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout';
import { HomeScreen } from './pages/home';
import { ProductList, ProductMain } from './pages/product';
import { CartScreen } from './pages/cart';
import OrderScreen from './pages/order/OrderScreen';
import { LayoutAdmin } from './pages/admin/components/Layout';
import HomeAdminScreen from './pages/admin/features/home/HomeAdminScreen';
import ManageProduct from './pages/admin/features/product/ManageProduct';
import ManageDiscount from './pages/admin/features/discount/ManageDiscount';
import ManageUser from './pages/admin/features/user/ManageUser';
import PaymentScreen from './pages/payment/PaymentScreen';
import ProtectedRoute from './components/protected/ProtectedRoute';

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
        path: '/product/:id',
        element: (
          <ProtectedRoute requireAdmin='false'>
            <ProductMain />
          </ProtectedRoute>
        ),
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoute requireAdmin='false'>
            <CartScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/order',
        element: (
          <ProtectedRoute requireAdmin='false'>
            <OrderScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/payment/vnpay-return',
        element: <PaymentScreen />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requireAdmin={true}>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
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
