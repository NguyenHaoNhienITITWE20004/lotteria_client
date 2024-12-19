import { RouterProvider } from 'react-router-dom';
import mainRouter from './router';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'red',
        },
      }}
    >
      <RouterProvider router={mainRouter} />
    </ConfigProvider>
  );
}

export default App;
