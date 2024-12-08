import { RouterProvider } from 'react-router-dom';
import mainRouter from './router';

function App() {
  return <RouterProvider router={mainRouter} />;
}

export default App;
