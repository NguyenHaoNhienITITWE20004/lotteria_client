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
import NotFoundScreen from './components/NotFoundScreen';
import ManageCategory from './pages/admin/features/category/ManageCategory';
import ManageOrder from './pages/admin/features/order/ManageOrder';
import OrderDetail from './pages/admin/features/order/OrderDetail';

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
          <ProtectedRoute>
            <ProductMain />
          </ProtectedRoute>
        ),
      },
      {
        path: '/cart',
        element: (
          <ProtectedRoute>
            <CartScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/order',
        element: (
          <ProtectedRoute>
            <OrderScreen />
          </ProtectedRoute>
        ),
      },
      {
        path: '/payment/vnpay-return',
        element: <PaymentScreen />,
      },
      {
        path: '*',
        element: <NotFoundScreen />,
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute requireAdmin>
        <LayoutAdmin />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
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
      {
        path: 'orders',
        element: <ManageOrder />,
      },
      {
        path: 'order/:id',
        element: <OrderDetail />,
      },
      {
        path: 'category',
        element: <ManageCategory />,
      },
      {
        path: 'discounts',
        element: <ManageDiscount />,
      },
      {
        path: '*',
        element: <NotFoundScreen />,
      },
    ],
  },
]);

export default mainRouter;
