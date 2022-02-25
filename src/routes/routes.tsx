/* eslint-disable max-len */
import Register2 from 'src/pages/Register2';
import SignIn2 from 'src/pages/SignIn2';
import { routeConstants } from 'src/constants';
import PrivateRoute from './PrivateRoute';
import { Route } from 'react-router-dom';

import DeviceDashboard from 'src/features/Devices/component/DeviceDashboard';
import DeviceDetail from 'src/features/Devices/component/DeviceDetail';

import { UserRole } from 'src/constants/user';

// 404 MAIN TAIN
import NotFound from 'src/pages/maintain-notfound/component/404';
import MainTain from 'src/pages/maintain-notfound/component/maintain';
const routers = {
  register: {
    exact: true,
    path: routeConstants.REGISTER,
    component: Register2,
    route: Route,
    role: [UserRole.Admin, UserRole.SuperAdmin],
  },
  signIn: {
    exact: true,
    path: routeConstants.SIGN_IN,
    component: SignIn2,
    route: Route,
    role: [UserRole.Admin, UserRole.SuperAdmin],
  },
  // liquidity pool
  poolDashboard: {
    exact: true,
    path: routeConstants.DEVICE_DASHBOARD,
    component: DeviceDashboard,
    route: PrivateRoute,
    role: [UserRole.Admin, UserRole.SuperAdmin],
  },
  poolDetail: {
    exact: true,
    path: routeConstants.DEVICE_DETAIL,
    component: DeviceDetail,
    route: PrivateRoute,
    role: [UserRole.Admin, UserRole.SuperAdmin],
  },
  notfound: {
    exact: true,
    path: routeConstants.NOT_FOUND,
    component: NotFound,
    route: Route,
    role: [UserRole.Admin, UserRole.SuperAdmin],
  },
  maintain: {
    exact: true,
    path: routeConstants.MAIN_TAIN,
    component: MainTain,
    route: Route,
    role: [UserRole.Admin, UserRole.SuperAdmin],
  },
};

export default routers;
