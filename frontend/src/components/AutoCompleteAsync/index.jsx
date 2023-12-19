import React, { useState, useEffect, useRef } from 'react';
import { Select } from 'antd';
import { request } from '@/request';
import useOnFetch from '@/hooks/useOnFetch';
import { useDebounce } from 'react-use';

export default function AutoCompleteAsync({
  entity,
  displayLabels,
  searchFields,
  outputValue = '_id',
  value,
  onChange,
}) {
  const [selectOptions, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);
  const isUpdating = useRef(true);
  const isSearching = useRef(false);
  const [searching, setSearching] = useState(false);
  const [valToSearch, setValToSearch] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(valToSearch);
    },
    500,
    [valToSearch]
  );

  const asyncSearch = (options) => {
    return request.search({ entity, options });
  };

  let { onFetch, result, isSuccess, isLoading } = useOnFetch();

  const labels = (optionField) => {
    return displayLabels.map((x) => optionField[x]).join(' ');
  };

  useEffect(() => {
    if (debouncedValue != '') {
      const options = {
        q: debouncedValue,
        fields: searchFields,
      };
      onFetch(() => asyncSearch(options));
    }

    return () => {
      cancel();
    };
  }, [debouncedValue]);

  const onSearch = (searchText) => {
    if (searchText && searchText != '') {
      isSearching.current = true;
      setSearching(true);
      setOptions([]);
      setCurrentValue(undefined);
      setValToSearch(searchText);
    }
  };

  useEffect(() => {
    if (isSearching.current) {
      if (isSuccess) {
        setOptions(result);
      } else {
        setSearching(false);
        setCurrentValue(undefined);
        setOptions([]);
      }
    }
  }, [isSuccess, result]);

  useEffect(() => {
    if (value && isUpdating.current) {
      setCurrentValue(value[outputValue] || value);
      if (onChange) {
        onChange(value[outputValue] || value);
      }
      isUpdating.current = false;
    }
  }, [value, onChange, outputValue]);

  const handleOnChange = (newValue) => {
    const selectedValue = newValue.codigo || newValue; // Asumiendo que 'codigo' es la propiedad que queremos
    setCurrentValue(selectedValue);
    if (onChange) {
      onChange(selectedValue);
    }
  };

  return (
    <Select
      loading={isLoading}
      showSearch
      allowClear
      placeholder={'Busca aquí'}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      notFoundContent={searching ? '... Buscando' : 'No encontrado'}
      value={currentValue}
      onSearch={onSearch}
      onChange={handleOnChange}
    >
      {selectOptions.map((optionField) => (
        <Select.Option
          key={optionField[outputValue] || optionField}
          value={optionField[outputValue] || optionField}
        >
          {labels(optionField)}
        </Select.Option>
      ))}
    </Select>
  );
}