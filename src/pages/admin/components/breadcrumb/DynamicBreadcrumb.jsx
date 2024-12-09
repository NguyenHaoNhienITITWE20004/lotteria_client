import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { menuItems } from '../../../../constant/sidebar';

const findBreadcrumb = (menuItems, currentPath) => {
  for (const item of menuItems) {
    if (item.path === currentPath) {
      return [item];
    }
    if (item.children) {
      const subPath = findBreadcrumb(item.children, currentPath);
      if (subPath.length) {
        return [item, ...subPath];
      }
    }
  }
  return [];
};

const DynamicBreadcrumb = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const breadcrumbItems = findBreadcrumb(menuItems, currentPath);

  return (
    <Breadcrumb className='text-gray-700 text-base'>
      {breadcrumbItems.map((item) => (
        <Breadcrumb.Item key={item.key}>
          <Link to={item.path} className='hover:text-blue-600'>
            {item.label}
          </Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
