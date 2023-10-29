import React from 'react';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import CrudModule from '@/modules/CrudModule';
import CurrencyForm from '@/forms/CurrencyForm';

export default function Currency() {
  const entity = 'currency';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['name'];

  const readColumns = [
    {
      title: 'Divisa',
      dataIndex: 'name',
    },
    {
      title: 'Símbolo',
      dataIndex: 'symbol',
    },
    {
      title: 'Decimal',
      dataIndex: 'decimal_separator',
    },
    {
      title: 'Miles',
      dataIndex: 'thousand_separator',
    },
    {
      title: 'Predeterminado',
      dataIndex: 'isDefault',
    },
  ];
  const dataTableColumns = [
    {
      title: 'Divisa',
      dataIndex: 'name',
    },
    {
      title: 'Símbolo',
      dataIndex: 'symbol',
    },
    {
      title: 'Decimal',
      dataIndex: 'decimal_separator',
    },
    {
      title: 'Miles',
      dataIndex: 'thousand_separator',
    },
    {
      title: 'Predeterminado',
      dataIndex: 'isDefault',
      key: 'isDefault',
      render: (text, row) => {
        return {
          props: {
            style: {
              width: '60px',
            },
          },
          children: (
            <Switch
              checked={text}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          ),
        };
      },
    },
  ];

  const ADD_NEW_ENTITY = 'Añadir divisa';
  const DATATABLE_TITLE = 'Listado';
  const ENTITY_NAME = 'divisa';
  const CREATE_ENTITY = 'Crear divisa';
  const UPDATE_ENTITY = 'Actualizar divisa';
  const PANEL_TITLE = 'Panel de divisas';

  const config = {
    entity,
    PANEL_TITLE,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <CrudModule
      createForm={<CurrencyForm />}
      updateForm={<CurrencyForm isUpdateForm={true} />}
      config={config}
    />
  );
}
