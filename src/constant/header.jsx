import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
const navigateItems = [
  {
    id: 1,
    title: 'BESTSELLER',
    link: '/',
  },
  {
    id: 2,
    title: 'ĐẶT HÀNG',
    link: '/',
  },
  {
    id: 3,
    title: 'KHUYẾN MÃI',
    link: '/',
  },
  {
    id: 4,
    title: 'CỬA HÀNG',
    link: '/',
  },
];
const accountMenu = [
  {
    id: 1,
    link: 'https://www.lotteria.vn/grs-static/images/icon-pos-2.svg',
  },
  {
    id: 2,
    link: 'https://www.lotteria.vn/grs-static/images/icon-myaccount.svg',
  },
  {
    id: 3,
    link: 'https://www.lotteria.vn/grs-static/images/icon-notification.svg',
  },
  {
    id: 4,
    link: 'https://www.lotteria.vn/grs-static/images/icon-cart.svg',
  },
];
const profileItems = [
  {
    key: '1',
    label: 'Tài khoản của tôi',
    disabled: true,
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    label: 'Cài đặt',
    icon: <SettingOutlined />,
  },
  {
    key: '4',
    label: 'Đăng xuất',
    icon: <LogoutOutlined />,
  },
];

export { navigateItems, accountMenu, profileItems };
