import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Menu, MenuItem, ProSidebar, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, useHistory } from 'react-router-dom';
import { routeConstants } from 'src/constants';
import './style.scss';

const useStyle = makeStyles(() => ({
  sideBar: {
    height: '100vh',
    position: 'fixed',
    zIndex: 100,
  },
}));

const Sidebar: React.FC = () => {
  const classes = useStyle();
  const history = useHistory();
  const [openRoute, setOpenRoute] = useState<string[]>([history.location.pathname?.split('/')[1]]);

  const handleOpenRoute = (route: string): void => {
    openRoute.includes(route) ? setOpenRoute(openRoute) : setOpenRoute([...openRoute, route]);
  };

  return (
    <div className={classes.sideBar}>
      <ProSidebar>
        <Menu iconShape="square">
          <SubMenu
            title="Devices"
            onClick={() => handleOpenRoute('pools')}
            open={!!openRoute.find((item) => item.indexOf('pools') !== -1)}
          >
            <MenuItem>
              <Link to={routeConstants.DEVICE_DASHBOARD}>Device Dashboard</Link>
            </MenuItem>
          </SubMenu>

        </Menu>
      </ProSidebar>
    </div>
  );
};

export default Sidebar;
