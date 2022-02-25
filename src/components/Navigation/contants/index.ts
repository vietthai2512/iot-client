import DashboardDarkIcon from 'src/assets/icon/dashboard-dark.svg';
import DashboardLightIcon from 'src/assets/icon/dashboard-light.svg';
import SignoutDarkIcon from 'src/assets/icon/signout-dark.svg';
import SignoutLightIcon from 'src/assets/icon/signout-light.svg';

export const ROUTE_SIDEBAR = {
  account_dashboard_overview: '/user/dashboard/over-view',
  account_dashboard_balances: '/user/dashboard/balances',
  account_dashboard_profit_and_loss: '/user/dashboard/profit-and-loss',
  account_trade_history_open_orders: '/user/trade-history/open-orders',
  account_trade_history_order_history: '/user/trade-history/order-history',
  account_trade_history_trade_history: '/user/trade-history/trade-history',
  account_notification: '/user/account/notification',
  account_notification_detail: '/user/account/notification/:id',
  account_setting: '/user/account/setting',
  device_dashboard: '/device/dashboard',
};

export const accountOptions = [
  {
    darkIcon: '',
    lightIcon: '',
    text: 'email',
    url: '',
  },
  {
    darkIcon: DashboardDarkIcon,
    lightIcon: DashboardLightIcon,
    text: 'Device dashboard',
    url: ROUTE_SIDEBAR.device_dashboard,
  },
  {
    darkIcon: SignoutDarkIcon,
    lightIcon: SignoutLightIcon,
    text: 'Sign out',
    url: '/sign-in',
  },
];
