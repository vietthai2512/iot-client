import React from 'react';
import classNames from 'classnames/bind';
import styles from 'src/features/Devices/styles/DeviceDashboard.module.scss';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { useHistory } from 'react-router-dom';
import { routeConstants } from 'src/constants';
import { makeStyles } from '@material-ui/core';
import { GridColumns, GridRowParams } from '@material-ui/data-grid';
import CDataGrid from 'src/components/DataGrid';
import Pagination from 'src/components/Pagination';
import { Loading, NoRows } from 'src/components/DataGrid/DataGrid';

const cx = classNames.bind(styles);

const rowStyle = makeStyles(() => ({
  table: {
    '& .MuiDataGrid-row': {
      cursor: 'pointer',
      maxHeight: 'none !important',
    },

    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important',
    },
    '& .MuiDataGrid-cell': {
      display: 'flex',
      alignItems: 'center',
      lineHeight: 'unset !important',
      maxHeight: 'none !important',
      whiteSpace: 'normal',
    },
  },
}));

const columns: GridColumns = [
  {
    field: 'id',
    sortable: false,
    headerName: 'Device ID',
    flex: 1,
  },
  {
    field: 'createdBy',
    sortable: false,
    headerName: 'Created by',
    flex: 1,
  },
  {
    field: 'createdTime',
    sortable: false,
    headerName: 'Created time',
    flex: 1,
  }
];

const DeviceDashboard: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();


  const handleOnRowClick = (row: GridRowParams) => {
    history.push(`/device/${row.id}`);
  };

  return (
    <div id="data-grid" className={cx('pool-dashboard')}>
      <div className={cx('utilities-bar')}>
      </div>

      <CDataGrid
        className={rowStyle().table}
        columns={columns}
        rows={[
          {
            id: 'demo1',
            createdBy: 'admin',
            createdTime: '22/02/2022 22:22:22'
          }
        ]}
        pageSize={10}
        rowCount={5}
        hideFooterRowCount
        hideFooterSelectedRowCount
        disableColumnMenu
        disableSelectionOnClick={true}
        disableColumnReorder={true}
        autoHeight
        rowHeight={80}
        headerHeight={36}
        components={{ Pagination: Pagination, NoRowsOverlay: NoRows, LoadingOverlay: Loading }}
        onRowClick={handleOnRowClick}
      />
    </div>
  );
};

export default DeviceDashboard;
