import { RouterProvider } from 'react-router-dom';
import mainRouter from './router';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'red',
        },
      }}
      locale={viVN}
    >
      <RouterProvider router={mainRouter} />
    </ConfigProvider>
  );
}

export default App;
