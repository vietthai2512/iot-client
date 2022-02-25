import React from 'react';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import '@fontsource/oswald';
import classNames from 'classnames/bind';
import styles from './TopNav.module.scss';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setTheme } from 'src/store/theme/theme';
import { THEME_MODE } from 'src/interfaces/theme';
import logoLight from 'src/assets/img/logo-light.svg';
import logoDark from 'src/assets/img/logo-dark.svg';
import userLight from 'src/assets/icon/user-light.svg';
import userDark from 'src/assets/icon/user-dark.svg';
import themeLight from 'src/assets/icon/theme-light.svg';
import themeDark from 'src/assets/icon/theme-dark.svg';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { routeConstants } from 'src/constants';
import { checkAuthRoute } from 'src/helpers/checkAuthRoute';
import useReturnUrl from 'src/hooks/useReturnUrl';
import { UserRole } from 'src/constants/user';
import Dropdown from 'src/components/Base/Dropdown';
import { Account } from 'src/components/Navigation/renderComponents';

const cx = classNames.bind(styles);
const urlRedirectPage = useReturnUrl();

export const renderFowardUrl = (
  element: JSX.Element,
  { url = urlRedirectPage, path, key }: { url?: string; path: string; key?: string },
): JSX.Element => {
  return (
    <a key={key} href={url + path} style={{ textDecoration: 'none' }}>
      {element}
    </a>
  );
};

const TopNav2: React.FunctionComponent = () => {
  const theme = useAppSelector((state) => state.theme.themeMode);
  const dispatch = useAppDispatch();
  const [accountRef, setAccountRef] = React.useState<HTMLButtonElement | null>(null);
  const onSwitchTheme = () => {
    const newTheme = theme === THEME_MODE.LIGHT ? THEME_MODE.DARK : THEME_MODE.LIGHT;
    dispatch(setTheme(newTheme));
  };
  const location = useLocation();
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const history = useHistory();

  return (
    <>
      {checkAuthRoute(location.pathname) ? (
        <AppBar position={'static'} className={cx('nav-bar')}>
          <Toolbar>
            <Box flexGrow={1} className={cx('logo')}>
              <Link to={routeConstants.DASHBOARD}>
                <img src={theme === THEME_MODE.LIGHT ? logoLight : logoDark} style={{ height: '64px' }} />
              </Link>
            </Box>

            <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement>) => setAccountRef(event.currentTarget)}>
              <img src={theme === THEME_MODE.LIGHT ? userLight : userDark} />
            </IconButton>
            <IconButton onClick={() => onSwitchTheme()}>
              <img src={theme === THEME_MODE.LIGHT ? themeLight : themeDark} />
            </IconButton>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position={'static'} className={cx('nav-bar')}>
          <Toolbar>
            <Box flexGrow={1} className={cx('logo')}>
              <img src={theme === THEME_MODE.LIGHT ? logoLight : logoDark} style={{ height: '64px' }} />
            </Box>
          </Toolbar>
        </AppBar>
      )}
    <Dropdown
        open={Boolean(accountRef)}
        refElm={accountRef}
        handleClose={() => setAccountRef(null)}
        items={Account(theme)}
      />
    </>
  );
};

export default TopNav2;
