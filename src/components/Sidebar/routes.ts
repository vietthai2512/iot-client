/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import IconLibraryBooks from '@material-ui/icons/LibraryBooks';
import { ReactComponent as LiquidityPoolIcon } from 'src/assets/icon/sidebar/liquidity-pool.svg';
import DeviceDashboard from 'src/features/Devices/component/DeviceDashboard';
import { routeConstants } from '../../constants';
import { UserRole } from 'src/constants/user';

interface IRoute {
  name: string;
  path: string;
  component?: any;
  icon?: any;
  children?: IRoute[];
  role?: number[];
}

export const ROUTE_SIDEBAR_ACCOUNT = [
  {
    name: 'Device',
    path: '/device',
    component: DeviceDashboard,
    icon: LiquidityPoolIcon,
    role: [UserRole.Admin, UserRole.SuperAdmin],
    children: [
      {
        name: 'Device dashboard',
        path: routeConstants.DEVICE_DASHBOARD,
        component: DeviceDashboard,
        icon: IconLibraryBooks,
        role: [UserRole.Admin, UserRole.SuperAdmin],
      },
    ],
  },
];

const convertRoute = ({ name, path }: IRoute) => ({ exact: true, name, path });

export const FLATTEN_SIDEBAR_ROUTE = [...ROUTE_SIDEBAR_ACCOUNT].reduce((total: any[], route: IRoute) => {
  const arr: any[] = [];
  !!route.children ? route.children.map((item: IRoute) => arr.push(convertRoute(item))) : convertRoute(route);
  return [...total, ...arr];
}, []);
