import React from 'react';
import classNames from 'classnames/bind';
import styles from 'src/features/Devices/styles/DeviceDetail.module.scss';
import { useHistory, useParams } from 'react-router-dom';
import DeviceOverview from 'src/features/Devices/component/DeviceDetail/DeviceOverview';
import DeviceGraph from 'src/features/Devices/component/DeviceDetail/DeviceGraph';
import Settings from 'src/features/Devices/component/DeviceDetail/Settings';

const cx = classNames.bind(styles);


const DeviceDetail: React.FC = () =>
{
  const { deviceId } = useParams<{ deviceId: string; }>();

  return (
    <div className={cx('pool-detail')}>
      <div className={cx('utilities-bar')}>

      </div>

      <div className={cx('pool-overview')}>
        <DeviceOverview deviceId={deviceId} />

      </div>

      <div className={cx(`detail-chart`)}>
        <DeviceGraph deviceId={deviceId} />
      </div>

      <div className={cx('more-detail')}>
        <hr />
        <Settings deviceId={deviceId} />
      </div>
    </div>
  );
};

export default DeviceDetail;
