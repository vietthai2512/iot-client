import axios from 'axios';
import classNames from 'classnames/bind';
import React from 'react';
import Spline from 'src/components/Chart/Spline';
import { useAppSelector } from 'src/store/hooks';
import styles from './DeviceGraph.module.scss';
import moment from 'moment';
import { setSnackbarError } from 'src/components/Snackbar';
import CLoading from 'src/components/Loading';

const cx = classNames.bind(styles);

export interface Values {
  result: string;
  table: number;
  _start: string;
  _stop: string;
  _time: string;
  _value: number;
  _field: string;
  _measurement: string;
  device: string;
}

export interface Records {
  table: number;
  values: Values;
}

const DeviceGraph: React.FC<{ deviceId: string }> = ({ deviceId }) =>
{
  const theme = useAppSelector((state) => state.theme.themeMode);
  const [loading, setLoading] = React.useState(true);
  const [lineSeries, setLineSeries] = React.useState<{
    series: {
      name: string;
      data: Array<{ x: string | number; y: string | number; }>;
    }[];
    labels: string[];
  }>({ series: [], labels: [] });

  const getGraphData = async () =>
  {
    const res = await axios.get(`${process.env.REACT_APP_BASE_API}/api/heartbeat/device/${deviceId}`);
    if (res.status === 500) {
      setSnackbarError('500 Error');
      setLoading(false);
      return;
    }
    const data = res.data.records as Records[];
    const lineData: Array<{ x: string | number; y: string | number; }> = data.map((item) => {
        return {
          x: Date.parse(item.values._time),
          y: item.values._value,
        };
    });
    
    const lineLabel: string[] = data.map((item) => moment(Date.parse(item.values._time)).format('LTS'));
    setLineSeries({
      series: [{
        name: 'Heartbeat',
        data: lineData,
      }],
      labels: lineLabel,
    });
    setLoading(false);
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      getGraphData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className={cx('filter-bar')}>
        <div className={cx('time-filter')}>
          <span>Heartbeat Graph</span>
        </div>
      </div>

      {loading && (
        <div className={cx('loading')}>
          <CLoading type="spin" size="md" />
        </div>
      )}

      <Spline
        {...lineSeries}
        height='350px'
        theme={theme}
        animationsEnable
      />
    </>
  );
};

export default DeviceGraph;
