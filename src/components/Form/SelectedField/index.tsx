/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, FieldProps } from 'formik';
import React, { Fragment, useState, useEffect, useRef } from 'react';
import Select, { OptionsType, ValueType, components, MenuProps, GroupTypeBase } from 'react-select';
import classnames from 'classnames/bind';
import stylesSCSS from './styles/SelectField.module.scss';
import Error from 'src/components/Form/Error';
import { TextField, FormControl, InputAdornment } from '@material-ui/core';
import SearchIcon from 'src/assets/icon/search.svg';
import CloseDarkButton from 'src/assets/icon/close-dark.svg';
import styles from './styles';

const cx = classnames.bind(stylesSCSS);

interface SelectOption {
  label: string;
  value: any;
}

interface SelectFieldProps extends FieldProps {
  options: OptionsType<SelectOption>;
  label: string;
  placeholder: string;
  disabled: boolean;
  isMulti?: boolean;
  showSearchBar?: boolean;
  searchPlaceholder?: string;
}

const CustomMenuWithSearchBar = (props: MenuProps<SelectOption, boolean, GroupTypeBase<SelectOption>>) => {
  const { selectProps, ...otherProps } = props;
  const { onInputChange, inputValue, setInputValue, onMenuInputFocus, searchPlaceholder } = selectProps;

  return (
    <components.Menu {...otherProps} selectProps={selectProps}>
      <Fragment>
        <div className={cx('search-bar-container')}>
          <TextField
            variant="outlined"
            className={cx('search-bar')}
            placeholder={searchPlaceholder || 'Search'}
            value={inputValue}
            onChange={(e) =>
              onInputChange &&
              onInputChange(e.currentTarget.value, {
                action: 'input-change',
              })
            }
            onMouseDown={(e: any) => {
              e.stopPropagation();
              e.target.focus();
            }}
            onFocus={onMenuInputFocus}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={SearchIcon} alt="" />
                </InputAdornment>
              ),
            }}
          />

          <span className={cx('clear-search-icon-container')}>
            <img src={CloseDarkButton} onClick={() => setInputValue('')} alt="" />
          </span>
        </div>

        <div className={cx('options')}>{props.children}</div>
      </Fragment>
    </components.Menu>
  );
};

// Set custom `SingleValue` and `Placeholder` to keep them when searching
const CustomValueContainer = ({ children, selectProps, ...props }: any) => {
  const commonProps: any = {
    cx: props.cx,
    clearValue: props.clearValue,
    getStyles: props.getStyles,
    getValue: props.getValue,
    hasValue: props.hasValue,
    isMulti: props.isMulti,
    isRtl: props.isRtl,
    options: props.options,
    selectOption: props.selectOption,
    setValue: props.setValue,
    selectProps,
    theme: props.theme,
  };

  return (
    <components.ValueContainer {...props} selectProps={selectProps}>
      {React.Children.map(children, (child) => {
        return child ? (
          child
        ) : props.hasValue ? (
          <components.SingleValue
            {...commonProps}
            isFocused={selectProps.isFocused}
            isDisabled={selectProps.isDisabled}
          >
            {selectProps.getOptionLabel(props.getValue()[0])}
          </components.SingleValue>
        ) : (
          <components.Placeholder
            {...commonProps}
            key="placeholder"
            isDisabled={selectProps.isDisabled}
            data={props.getValue()}
          >
            {selectProps.placeholder}
          </components.Placeholder>
        );
      })}
    </components.ValueContainer>
  );
};

const SelectField: React.FC<SelectFieldProps> = (props) => {
  const classes = styles();
  const {
    field,
    form,
    options,
    label,
    placeholder,
    disabled,
    isMulti,
    showSearchBar = false,
    searchPlaceholder,
  } = props;
  const { name } = field;
  const { errors, touched } = form;
  const errorName = errors[name] as string;
  const showError = errors[name] && touched[name];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleOnChange = (option: ValueType<SelectOption | SelectOption[], boolean>) => {
    setIsFocused(false);
    form.setFieldValue(
      name,
      isMulti ? (option as SelectOption[]).map((item: SelectOption) => item.value) : (option as SelectOption).value,
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : ('' as any);
    }
  };

  // When click on dom, check if the event are happend on the select element
  const onDomClick = (e: any) => {
    if (containerRef !== null && containerRef.current !== null) {
      // containerRef are refered to div element select-component-container
      // use containerRef.current to access to  div element select-component-container
      const menu = containerRef.current.querySelector('.select__menu');

      // Stop focus on select menu if
      // 1) The event are happend on the div element select-component-container
      // 2) Cannot find element with class .select__menu
      // 3) The event are happend on the element with class .select__menu
      if (!containerRef.current.contains(e.target) || !menu || !menu.contains(e.target)) {
        setIsFocused(false); // stop focus on the menu
        setInputValue(''); // reset search value
      }
    }
  };

  // add to even mousedown the evenHandler onDomClick
  useEffect(() => {
    document.addEventListener('mousedown', onDomClick);

    return () => {
      document.removeEventListener('mousedown', onDomClick);
    };
  }, []);

  return (
    <FormControl className={cx('select-field-container')}>
      {label && <label htmlFor={name}>{label}</label>}

      <div ref={containerRef} id="select-component-container">
        <Select
          id={name}
          {...field}
          value={getValue()}
          components={
            showSearchBar
              ? {
                  Menu: CustomMenuWithSearchBar,
                  ValueContainer: CustomValueContainer,
                }
              : undefined
          }
          maxMenuHeight={230}
          noOptionsMessage={() => 'Not Found'}
          onChange={handleOnChange}
          classNamePrefix={`theme-select`}
          placeholder={placeholder}
          isDisabled={disabled}
          options={options}
          className={`${showError ? 'is-invalid' : ''} ${classes.select}`}
          isMulti={isMulti}
          inputValue={inputValue}
          setInputValue={setInputValue}
          backspaceRemovesValue={false}
          searchPlaceholder={searchPlaceholder}
          isSearchable={false}
          onMenuInputFocus={() => setIsFocused(true)}
          onInputChange={(val) => setInputValue(val)}
          {...{
            menuIsOpen: isFocused || undefined,
            isFocused: isFocused || undefined,
          }}
        />
      </div>

      <ErrorMessage name={name} component={(): JSX.Element => <Error errorName={errorName} />} />
    </FormControl>
  );
};

export default SelectField;
