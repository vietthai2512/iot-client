import React from 'react';
import styles from './TextArea.module.scss';
import classNames from 'classnames/bind';

interface Props {
  rows?: number;
  cols?: number;
  placehodler?: string;
  value?: string;
  onChange?: (v: string) => void;
  setTextArea: (value: string) => void;
  classNamePrefix?: string;
  defaultValue?: string;
}
const cx = classNames.bind(styles);

export const CTextArea: React.FC<Props> = ({
  rows = 4,
  cols,
  placehodler = 'TextArea',
  value,
  defaultValue,
  setTextArea,
}) => {
  return (
    <textarea
      placeholder={placehodler}
      rows={rows}
      cols={cols}
      value={value}
      onChange={(event) => setTextArea(event.target.value)}
      defaultValue={defaultValue}
      className={cx('theme-textarea')}
    ></textarea>
  );
};

export default CTextArea;
