import {
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
  TagOutlined,
  GiftOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import { matchPath } from 'react-router-dom';

const isOrderPage = matchPath('/admin/order/:id', location.pathname);

const menuItems = [
  {
    key: 'dashboard',
    icon: <AppstoreOutlined />,
    label: 'Dashboard',
    index: true,
  },
  {
    key: 'product',
    icon: <UnorderedListOutlined />,
    label: 'Products',
    children: [
      {
        key: 'manage-product',
        label: 'Manage Products',
        path: '/admin/product',
        icon: <ContainerOutlined />,
      },
      {
        key: 'create-product',
        label: 'Create Product',
        path: '/admin/product/create',
        icon: <ShoppingCartOutlined />,
      },
    ],
  },
  {
    key: 'user',
    icon: <UserOutlined />,
    label: 'Users',
    children: [
      {
        key: 'manage-user',
        label: 'Manage Users',
        path: '/admin/users',
        icon: <UserOutlined />,
      },
      {
        key: 'create-user',
        label: 'Create User',
        path: '/admin/users/create',
        icon: <UserOutlined />,
      },
    ],
  },
  {
    key: 'order',
    icon: <ShoppingCartOutlined />,
    label: 'Orders',
    path: '/admin/orders',
    className: isOrderPage ? 'active' : '',
    children: [
      {
        key: 'manage-order',
        label: 'Manage Orders',
        path: '/admin/orders',
        icon: <ShoppingCartOutlined />,
      },
    ],
  },
  {
    key: 'collection',
    icon: <GiftOutlined />,
    label: 'Collections',
    children: [
      {
        key: 'manage-collection',
        label: 'Manage Collections',
        path: '/admin/category',
        icon: <ContainerOutlined />,
      },
      {
        key: 'create-collection',
        label: 'Create Collection',
        path: '/admin/category/create',
        icon: <ContainerOutlined />,
      },
    ],
  },
  {
    key: 'discount',
    icon: <TagOutlined />,
    label: 'Discounts',
    path: '/admin/discounts',
    children: [
      {
        key: 'manage-discount',
        label: 'Manage Discounts',
        path: '/admin/discounts',
        icon: <TagOutlined />,
      },
      {
        key: 'create-discount',
        label: 'Create Discount',
        path: '/admin/discounts/create',
        icon: <TagOutlined />,
      },
    ],
  },
  {
    key: 'setting',
    icon: <SettingOutlined />,
    label: 'Settings',
    path: '/admin/settings',
  },
];

export { menuItems };
