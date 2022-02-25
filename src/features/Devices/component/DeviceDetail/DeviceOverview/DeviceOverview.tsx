import React from 'react';
import classNames from 'classnames/bind';
import styles from './DeviceOverview.module.scss';
import Donut from 'src/components/Chart/Donut';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import axios from 'axios';
import { setSnackbarError } from 'src/components/Snackbar';
import { Records } from 'src/features/Devices/component/DeviceDetail/DeviceGraph/DeviceGraph';
import CLoading from 'src/components/Loading';

const cx = classNames.bind(styles);

const DeviceOverview: React.FC<{ deviceId: string; }> = ({ deviceId }) =>
{
  const [loading, setLoading] = React.useState(true);
  const [highestHR, setHighestHR] = React.useState<undefined | number>(undefined);
  const [lowestHR, setLowestHR] = React.useState<undefined | number>(undefined);
  const [averageHR, setAverageHR] = React.useState<undefined | number>(undefined);

  const getGraphData = async () =>
  {
    const res = await axios.get(`${process.env.REACT_APP_BASE_API}/api/heartbeat/device/${deviceId}`);
    if (res.status === 500)
    {
      setSnackbarError('500 Error');
      setLoading(false);
      return;
    }
    const data = res.data.records as Records[];
    const hr = data.map((item) => item.values._value);
    setHighestHR(Math.max(...hr));
    setLowestHR(Math.min(...hr));
    setAverageHR(Math.round(hr.reduce((prev, curr) => prev + curr) / hr.length));
    setLoading(false);
  };

  React.useEffect(() =>
  {
    const intervalId = setInterval(() =>
    {
      getGraphData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className={cx('pool-name')}>
        <div>Device ID</div>
        <div>
          <span>{deviceId}</span>
        </div>
      </div>


      <div className={cx('pool-info')}>
        <div className={cx('pair')}>
          <div className={cx('value')}>
            {loading ?
              <CLoading type="text" size='md'></CLoading>
              : highestHR}</div>
          <div className={cx('label')}>Highest heartbeat</div>
        </div>

        <div className={cx('pair')}>
          <div className={cx('value')}>{loading ?
            <CLoading type="text" size='md'></CLoading> : lowestHR}</div>
          <div className={cx('label')}>Lowest heartbeat</div>
        </div>

        <div className={cx('pair')}>
          <div className={cx('value')}>{loading ?
            <CLoading type="text" size='md'></CLoading> : averageHR}</div>
          <div className={cx('label')}>Average heartbeat</div>
        </div>
      </div>
    </>
  );
};

export default DeviceOverview;
