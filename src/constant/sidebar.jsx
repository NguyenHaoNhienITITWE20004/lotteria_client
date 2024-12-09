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

const menuItems = [
  {
    key: 'dashboard',
    icon: <AppstoreOutlined />,
    label: 'Dashboard',
    path: '/admin/',
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
    children: [
      {
        key: 'manage-order',
        label: 'Manage Orders',
        path: '/admin/orders/manage',
        icon: <ShoppingCartOutlined />,
      },
    ],
  },
  {
    key: 'collection',
    icon: <GiftOutlined />,
    label: 'Collections',
    path: '/admin/collections',
    children: [
      {
        key: 'manage-collection',
        label: 'Manage Collections',
        path: '/admin/collections/manage',
        icon: <ContainerOutlined />,
      },
      {
        key: 'create-collection',
        label: 'Create Collection',
        path: '/admin/collections/create',
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
        path: '/admin/discounts/manage',
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
