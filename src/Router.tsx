import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { TransactionsPage } from './pages/Transactions.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TransactionsPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
