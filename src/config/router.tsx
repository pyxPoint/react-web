import {lazy} from 'react';
import {Navigate} from 'react-router-dom';

const Layout = lazy(() => import('@/layouts')),
  Services = lazy(() => import('@/pages/services')),
  Menu = lazy(() => import('@/pages/menu')),
  Login = lazy(() => import('@/pages/login')),
  RequireAuth = lazy(() => import('@/auth/RequireAuth')),
  NotFound = lazy(() => import('@/pages/notfound')),
  Account = lazy(() => import('@/pages/account'));

const constantRoutes = [
  {path: 'login', title: 'login', element: <Login />},
  {
    path: '/',
    title: 'home',
    hidden: true,
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {index: true, element: <Navigate to={'/services'} replace />},
      {path: 'account', title: 'account', element: <Account />, hidden: false},
      {
        path: 'services',
        title: 'Services',
        element: <Services />,
        hidden: false
      },
      {
        path: 'menu',
        title: 'Menu',
        element: <Menu />,
        hidden: false
      }
    ]
  },
  {path: '*', title: '404', element: <NotFound />}
];

export default constantRoutes;
