import React from 'react';
import classNames from 'classnames/bind';
import styles from './Settings.module.scss';
import { ReactComponent as EditIcon } from 'src/assets/icon/edit-light.svg';
import { CButton } from 'src/components/Base/Button';
import CLoading from 'src/components/Loading';
import { FastField, Form, Formik } from 'formik';
import InputFieldPool from 'src/features/Devices/component/InputFieldPool';
import * as yup from 'yup';
import stylesInput from 'src/features/Devices/styles';
import axios from 'axios';
import { setSnackbarError } from 'src/components/Snackbar';

const cx = classNames.bind(styles);

interface Props
{
  deviceId: string,
}

interface Patient
{
  device_id?: string,
  doctor_email?: string,
  heartrate_threshhold?: number,
}

const Settings: React.FC<Props> = ({ deviceId }) =>
{
  const [loadingSetting, setLoadingSetting] = React.useState(true);
  const [editFees, setEditFees] = React.useState(false);
  const [doctorEmail, setDoctorEmail] = React.useState<undefined | string>(undefined);
  const [heartrateThreshhold, setHeartrateThreshhold] = React.useState<undefined | number>(undefined);

  const getPatientData = async () =>
  {
    const res = await axios.get(`${process.env.REACT_APP_BASE_API}/api/patient/${deviceId}`);
    if (res.status === 500)
    {
      setSnackbarError('500 Error');
      setLoadingSetting(false);
      return;
    }
    const data = res.data as Patient;
    setDoctorEmail(data?.doctor_email);
    setHeartrateThreshhold(data?.heartrate_threshhold);
    setLoadingSetting(false);
  };

  React.useEffect(() =>
  {
    getPatientData();
  }, [deviceId]);

  return (
    <div className={cx('settings', loadingSetting ? 'loading' : null)}>
      {loadingSetting ? (
        <CLoading type="spin" size="md" />
      ) : (
        <>
          <div className={cx('setting-detail')}>
            <div className={cx('title')}>
              Patient
              {!editFees && <EditIcon onClick={() => setEditFees(!editFees)} />}
            </div>

            <div className={cx('fees-setting')}>
              {!editFees ? (
                <>
                  <div className={cx('fee-input')}>
                    <div>Doctor email:</div>
                    <div>{doctorEmail}</div>
                  </div>

                  <div className={cx('fee-input')}>
                    <div>Heartrate threshhold:</div>
                    <div>{heartrateThreshhold}</div>
                  </div>
                </>
              ) : (
                <Formik
                  key="fees"
                  initialValues={{
                    doctorEmail: doctorEmail,
                    heartrateThreshhold: heartrateThreshhold,
                  }}
                  validationSchema={yup.object({
                    doctorEmail: yup
                      .string()
                      .required('This field is required'),
                    heartrateThreshhold: yup
                      .string()
                      .required('This field is required'),
                  })}
                  onSubmit={async (values, { setSubmitting }) =>
                  {
                    setSubmitting(true);
                    await axios.post(`${process.env.REACT_APP_BASE_API}/api/patient`, {
                      device_id: deviceId,
                      doctor_email: values.doctorEmail,
                      heartrate_threshhold: values.heartrateThreshhold,
                    });
                    setEditFees(false);
                    setSubmitting(false);
                  }}
                >
                  {({ setFieldValue, isSubmitting, handleSubmit }) => (
                    <Form className={stylesInput().form}>
                      <div className={cx('fee-input')}>
                        <div>Doctor email:</div>
                        <FastField
                          name="doctorEmail"
                          component={InputFieldPool}
                          disabled={isSubmitting}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          {
                            setFieldValue('doctorEmail', event.target.value);
                          }}
                        />
                      </div>

                      <div className={cx('fee-input')}>
                        <div>Heartrate threshhold:</div>
                        <FastField
                          name="heartrateThreshhold"
                          component={InputFieldPool}
                          disabled={isSubmitting}
                          limitDigitAfterPeriod={2}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          {
                            setFieldValue('heartrateThreshhold', event.target.value);
                          }}
                        />
                      </div>

                      <div className={cx('action-buttons')}>
                        <CButton
                          size="sm"
                          type="secondary"
                          content="Cancel"
                          isDisabled={isSubmitting}
                          onClick={() => setEditFees(!editFees)}
                        />

                        <CButton
                          size="sm"
                          type="primary"
                          content="Save change"
                          actionType="submit"
                          onClick={handleSubmit}
                          isLoading={isSubmitting}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
