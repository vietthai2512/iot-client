import '@fontsource/roboto';
import React, { useEffect } from 'react';
import { Redirect, Switch, useLocation } from 'react-router-dom';
import Sidebar from 'src/components/Sidebar/Sidebar';
import NavBar from './components/Navigation';
import routers from './routes/routes';
import { useAppDispatch, useAppSelector } from './store/hooks';
import './styles/_app.scss';
import { routeConstants } from 'src/constants';
import { checkAuthRoute, checkNotNavBar } from 'src/helpers/checkAuthRoute';
import CustomSnackbar from 'src/components/Snackbar';
import { setTheme } from 'src/store/theme/theme';
import { THEME_MODE } from 'src/interfaces/theme';
import { getCookieStorage } from 'src/helpers/storage';
import { getMe } from 'src/store/auth';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const App: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.themeMode);
  const location = useLocation();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!currentUser.id && getCookieStorage('access_token')) {
      dispatch(getMe());
    }
  }, []);

  useEffect(() => {
    if (!checkAuthRoute(location.pathname)) {
      dispatch(setTheme(THEME_MODE.LIGHT));
    }
  }, [location.pathname, dispatch]);

  const muiTheme = createMuiTheme({
    props: {
      MuiButtonBase: {
        // The properties to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    transitions: {
      // So we have `transition: none;` everywhere
      create: () => 'none',
    },
    overrides: {
      // Name of the component ⚛️
      MuiCssBaseline: {
        // Name of the rule
        '@global': {
          '*, *::before, *::after': {
            transition: 'none !important',
            animation: 'none !important',
          },
        },
      },
    },
  });

  if (location.pathname === '/') {
    return <Redirect to={routeConstants.SIGN_IN} />;
  }
  return (
    <ThemeProvider theme={muiTheme}>
      <div className="App">
        <div className="Snackbar">
          <CustomSnackbar />
        </div>
        <div className="Navbar">{checkNotNavBar(location.pathname) ? <></> : <NavBar />}</div>
        <div className="Content">
          {checkAuthRoute(location.pathname) && <Sidebar />}
          <React.Suspense fallback={<div>....Loading</div>}>
            <Switch>
              {Object.values(routers)
                // .filter((item) => item.role.includes(currentUser.role))
                .map((route) => {
                  //@ts-ignore
                  return <route.route key={route.path} {...route} />;
                })}
            </Switch>
          </React.Suspense>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
