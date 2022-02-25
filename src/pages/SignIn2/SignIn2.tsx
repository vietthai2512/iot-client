import React, { useState } from 'react';
import * as yup from 'yup';
import classNames from 'classnames/bind';
import { FastField, Form, Formik, ErrorMessage } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './styles';
import stylesSCSS from 'src/pages/SignIn2/styles/Login.module.scss';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import InputField from 'src/components/Form/InputField';
import { useAppDispatch } from 'src/store/hooks';
import Error from 'src/components/Form/Error';
import { openSnackbar, SnackbarVariant } from 'src/store/snackbar';
import httpExceptionSubCode from 'src/constants/httpExceptionSubCode';
import { fakeLogin, postLogin } from 'src/store/auth';
import { routeConstants } from 'src/constants';
import BackgroundImg from 'src/assets/img/TDH-1.jpg';
import { sleep } from 'src/helpers/share';
import { CButton } from 'src/components/Base/Button';
import { IUserInfo } from 'src/constants/user';

const cx = classNames.bind(stylesSCSS);

const SignIn2: React.FC = () =>
{
  const [showCaptchaError, setShowCaptcharError] = useState(true);

  const dispatch = useAppDispatch();
  const classes = styles();
  const history = useHistory();

  const validationSchema = yup.object({
    username: yup.string().required('This field is required'),
    password: yup.string().required('This field is required'),
    //isVerify: yup.string().required(),
  });

  const initialValues = {
    username: '',
    password: '',
    isVerify: '',
  };

  return (
    <>
      <div className={cx('user-sign-in')}>
        <img className={cx('intro-img')} src={BackgroundImg} />

        <div className={cx('form-container-margin')}>
          <div className={cx('form-container')}>
            <Typography variant="h3" className={cx('title')}>
              Sign In
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (value, { setSubmitting }): Promise<void> =>
              {
                /* setSubmitting(true);
                const res = await dispatch(postLogin(value));

                if (res?.payload?.status_code === 400 && res?.payload?.code === 'INVALID_GOOGLE_CAPTCHA')
                {
                  dispatch(
                    openSnackbar({
                      message: 'Invalid Captcha.',
                      variant: SnackbarVariant.ERROR,
                    }),
                  );
                  return;
                }

                if (res?.payload?.status_code === 403)
                {
                  if (res?.payload?.code === httpExceptionSubCode.FORBIDDEN.LOCK_ACCOUNT)
                  {
                    setIsShowScreenLock(true);
                    return;
                  }

                  if (res?.payload?.code === httpExceptionSubCode.FORBIDDEN.ADMIN_NOT_CHANGED_DEFAULT_PASSWORD)
                  {
                    setUsername(value.username);
                    setChangePassword(true);
                    return;
                  }
                }

                if (res?.payload.code === 0)
                {
                  history.push(routeConstants.DASHBOARD);
                  return;
                }

                setSubmitting(false); */
                setSubmitting(true);
                await sleep(3000);
                const curUser: IUserInfo = {
                  fullname: 'Hello World',
                  access_token: 'fasfsdf',
                  IP: '127.0.0.1',
                  company: 'Tee',
                  created_at: new Date(Date.now()),
                  email: value.username,
                  id: 12345,
                  last_login: new Date(Date.now()),
                  phone: '',
                  refresh_token: 'fsafsdf',
                  role: 1,
                };
                dispatch(fakeLogin(curUser));
                history.push(routeConstants.DEVICE_DASHBOARD);
                setSubmitting(false);
              }}
            >
              {(formikProps): JSX.Element =>
              {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { values, errors, touched, isSubmitting, setFieldValue } = formikProps;

                return (
                  <>
                    <Form className={classes.form} id="create-form">
                      <FastField name="username" component={InputField} label="Email" placeholder="Email" />

                      <FastField
                        type="password"
                        name="password"
                        component={InputField}
                        label="Password"
                        placeholder="Password"
                      />
                      <div
                        className={cx('forgot_password')}
                        onClick={() => history.push(routeConstants.REGISTER)}
                      >
                        Register now
                      </div>

                      <div className={cx('g-recaptcha')}>
                        {/* <ReCAPTCHA
                          sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITEKEY || ''}
                          onExpired={() =>
                          {
                            setFieldValue('isVerify', '');
                            setShowCaptcharError(false);
                          }}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          onChange={(v: any) =>
                          {
                            setFieldValue('isVerify', v);
                          }}
                        /> */}
                      </div>
                      {/*showCaptchaError && (
                        <ErrorMessage
                          name="isVerify"
                          component={(): JSX.Element => (
                            <Error errorName="Please verify that you are not a robot" />
                          )}
                        />
                          )*/}
                    </Form>

                    <CButton
                      size="md"
                      type="primary"
                      actionType="submit"
                      form='create-form'
                      content='Sign In'
                      isLoading={isSubmitting}
                    />
                  </>
                );
              }}
            </Formik>
          </div>
        </div>

      </div>
    </>
  );
};

export default SignIn2;
