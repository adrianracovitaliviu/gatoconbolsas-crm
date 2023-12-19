import React from 'react';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import CrudModule from '@/modules/CrudModule';
import PaymentModeForm from '@/forms/PaymentModeForm';

export default function PaymentMode() {
  const entity = 'paymentMode';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['name'];

  const readColumns = [
    {
      title: 'Método de pago',
      dataIndex: 'name',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
    },
    {
      title: 'Predeterminado?',
      dataIndex: 'isDefault',
    },
    {
      title: 'Activo',
      dataIndex: 'enabled',
    },
  ];
  const dataTableColumns = [
    {
      title: 'Método de pago',
      dataIndex: 'name',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
    },
    {
      title: 'Predeterminado?',
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
    {
      title: 'Activo',
      dataIndex: 'enabled',
      key: 'enabled',
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

  const ADD_NEW_ENTITY = 'Añadir método de pago';
  const DATATABLE_TITLE = 'Listado de métodos';
  const ENTITY_NAME = 'Método de pago';
  const CREATE_ENTITY = 'Crear método de pago';
  const UPDATE_ENTITY = 'Actualizar método de pago';
  const PANEL_TITLE = 'Panel de pagos';

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
      createForm={<PaymentModeForm />}
      updateForm={<PaymentModeForm isUpdateForm={true} />}
      config={config}
    />
  );
}
