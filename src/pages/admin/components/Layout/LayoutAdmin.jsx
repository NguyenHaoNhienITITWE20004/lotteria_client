import React from 'react';
import { Layout } from 'antd';
import SidebarAdmin from './SidebarAdmin';
import HeaderAdmin from './HeaderAdmin';
import { Outlet } from 'react-router-dom';
import DynamicBreadcrumb from '../breadcrumb/DynamicBreadcrumb';

const { Content } = Layout;

const LayoutAdmin = () => {
  return (
    <Layout className='min-h-screen flex'>
      {/* Sidebar */}
      <div className='w-[260px] bg-[#001529] text-gray-200 fixed left-0 top-0 bottom-0'>
        <SidebarAdmin />
      </div>
      {/* Content Section */}
      <Layout className='flex-1 ml-[260px]'>
        <HeaderAdmin />
        <div className='mt-5 ml-5'>
          <DynamicBreadcrumb />
        </div>
        <Content className='flex-1 p-6 mt-10 bg-slate-200 overflow-auto'>
          <div>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
