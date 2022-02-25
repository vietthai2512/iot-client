import classNames from 'classnames/bind';
import { FastField, Form, Formik, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InputField from 'src/components/Form/InputField';
import stylesSCSS from 'src/pages/Register/styles/CreateAccount.module.scss';
import { Link } from 'react-router-dom';
import { routeConstants } from 'src/constants';
import
  {
    companyNameRegex,
    nameRegex,
    passwordRegex,
    phoneNumberRegex,
    emailRegex,
    positionRegex,
  } from 'src/helpers/user';
import { useAppDispatch } from 'src/store/hooks';
import * as yup from 'yup';
import styles from './styles';
import { Box, Typography, TextField } from '@material-ui/core';
//import { createUser } from 'src/store/auth';
//import { checkValidEmail } from 'src/services/user';
import { Button } from '@material-ui/core';
import BackgroundImg from 'src/assets/img/TDH-1.jpg';

const TITLE = [
  { value: 'Mr.', label: 'Mr.' },
  { value: 'Ms.', label: 'Ms.' },
];

const cx = classNames.bind(stylesSCSS);

const Register2: React.FC = () =>
{
  const classes = styles();

  let currentEmail = '';
  let currentEmailState = true;

  const validationSchema = yup.object({
    fullname: yup
      .string()
      .trim()
      .matches(nameRegex, 'Sorry, special characters are not allowed.')
      .required('This field is required.'),
    company: yup
      .string()
      .trim()
      .matches(companyNameRegex, 'Sorry, special characters are not allowed.')
      .required('This field is required.'),
    position: yup
      .string()
      .trim()
      .matches(positionRegex, 'Sorry, numbers and special characters are not allowed.')
      .required('This field is required.'),
    email: yup
      .string()
      .required('This field is required.')
      .matches(emailRegex, 'Please enter a correct email.')
      .test(
        `check-valid-email`,
        'This email is already registered. Try another or reset your password.',
        async function (value)
        {
          if (value && emailRegex.test(String(value)) && currentEmail != value)
          {
            currentEmail = value;
            const res = {
              code: 0,
              status_code: 0,
            };//await checkValidEmail(value);

            if (res.code === 0) currentEmailState = true;
            if (res.status_code === 406) currentEmailState = false;
          }

          return currentEmailState;
        },
      ),
    password: yup
      .string()
      .max(30, 'Sorry, your password must be between 8 and 30 characters long with 1 uppercase letter and number.')
      .min(8, 'Sorry, your password must be between 8 and 30 characters long with 1 uppercase letter and number.')
      .matches(
        passwordRegex,
        'Sorry, your password must be between 8 and 30 characters long with 1 uppercase letter and 1 number.',
      )
      .required('This field is required.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'These passwords do not match. Try again.')
      .matches(
        passwordRegex,
        'Sorry, your password must be between 8 and 30 characters long with 1 uppercase letter and number.',
      )
      .required('This field is required.'),
    phone: yup
      .string()
      .matches(phoneNumberRegex, 'Special character is not displayed.')
      .max(12, 'Sorry, the phone number must be between 9 and 12 numbers only.')
      .min(9, 'Sorry, the phone number must be between 9 and 12 numbers only.')
      .required('This field is required.'),
    functional_currencies: yup
      .array()
      .of(yup.number())
      .min(1, 'This field is required.')
      .required('This field is required.'),
    velo_account: yup.string().matches(emailRegex, 'Please enter a correct email.'),
    wallets: yup
      .array()
      .of(yup.string())
      .test('wallets-required', 'This field is required.', function (value)
      {
        if (!value || value[0] === '' || value[0] === undefined) return false;
        return true;
      }),
  });

  const initialValues = {
    fullname: '',
    company: '',
    position: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    functional_currencies: [] as number[],
    wallets: [''] as string[],
    velo_account: '',
  };

  return (
    <div className={cx('container')}>
      <img className={cx('intro-img')} src={BackgroundImg} />
      <div className={cx('admin-create')}>
        <Typography variant="h3" className={cx('title')}>
          <Box fontWeight={700}>Registration form</Box>
        </Typography>
        <div className={cx('form-container')}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (value, { setSubmitting, resetForm }): Promise<void> =>
            {
              /* // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { confirmPassword, velo_account, ...rs } = value;
              setSubmitting(true);
              const createUserInfo = velo_account
                ? {
                    ...rs,
                    regionCode: '+' + regionCode.mobileCode,
                    velo_account: velo_account,
                  }
                : {
                    ...rs,
                    regionCode: '+' + regionCode.mobileCode,
                  };

              const res = await dispatch(createUser(createUserInfo));

              if (res.payload?.code === 0) {
                resetForm();
                history.push(`${routeConstants.VERIFY_EMAIL}?email=${value.email}`);
              }

              setSubmitting(false); */
            }}
          >
            {(formikProps): JSX.Element =>
            {
              // do something here ...
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { values, errors, touched, isSubmitting } = formikProps;
              return (
                <Form className={classes.form} id="create-form">
                  <FastField
                    name="fullname"
                    component={InputField}
                    isTrim={true}
                    label="Full name"
                    placeholder="Full name"
                  />

                  <FastField name="email" component={InputField} label="Email" placeholder="Email" maxLength={320} />

                  <label className={cx('label')}>Phone number</label>
                  <div className={cx('phone-container')}>
                    <FastField name="phone" isPhoneNumber={true} component={InputField} placeholder="Phone number" />
                  </div>

                  <FastField
                    type="password"
                    name="password"
                    component={InputField}
                    label="Password"
                    placeholder="Password"
                  />

                  <FastField
                    type="password"
                    name="confirmPassword"
                    component={InputField}
                    label="Confirm password"
                    placeholder="Confirm password"
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
        <Button form="create-form" variant="contained" color="primary" type="submit" className={classes.button}>
          Register
        </Button>

        <div className={cx('sign-in')}>
          {`Already have an account? `}
          <Link className={cx('sign-in_link')} to={routeConstants.SIGN_IN}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register2;
