import React, { useRef, useState } from 'react';
import styles from './Select2.module.scss';
import classnames from 'classnames/bind';
import useClickOutside from 'src/hooks/useClickOutside';
import ArrowDown from 'src/assets/icon/ArrowDown';

const cx = classnames.bind(styles);

export interface ISelect {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  label: string;
}
interface Props {
  size?: 'md' | 'lg';
  variant?: 'contained' | 'raw';
  options: ISelect[];
  option: ISelect;
  onClick: (value: ISelect) => void;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode | null;
  className?: string;
}

const Select2: React.FC<Props> = ({
  size = 'md',
  variant = 'contained',
  options,
  option,
  onClick,
  startAdornment,
  endAdornment = <ArrowDown />,
  className,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>();

  useClickOutside(ref, () => setOpen(false));

  const handleClick = () => {
    setOpen(!open);
  };

  const returnSize = (size: string) => {
    switch (size) {
      case 'lg':
        return 'lg';
      case 'md':
        return 'md';
      default:
        break;
    }
  };

  const returnVariant = (variant: string) => {
    switch (variant) {
      case 'contained':
        return 'contained';
      case 'raw':
        return 'raw';
      default:
        break;
    }
  };

  return (
    <>
      <div className={cx('container', className)} ref={ref}>
        <div
          className={cx('select', returnVariant(variant), returnSize(size))}
          key={option.value}
          onClick={handleClick}
        >
          <div>
            {startAdornment}
            <p>{option.label}</p>
          </div>
          {endAdornment}
        </div>

        {open && (
          <div className={cx('option', returnSize(size))}>
            {options.map((item) => (
              <p
                key={item.value}
                onClick={() => {
                  onClick(item);
                  handleClick();
                }}
              >
                {item.label}
              </p>
            ))}
          </div>
        )}
      </div>
      {open && <div className={cx('overlay')} />}
    </>
  );
};

export default Select2;
