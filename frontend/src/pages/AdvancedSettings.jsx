import React from 'react';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import CrudModule from '@/modules/CrudModule';
import AdvancedSettingsForm from '@/forms/AdvancedSettingsForm';

export default function AdvancedSettings() {
  const entity = 'setting';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['name'];

  const readColumns = [
    {
      title: 'Ajuste',
      dataIndex: 'settingKey',
    },
    {
      title: 'Valor',
      dataIndex: 'settingValue',
    },
    {
      title: 'Activo',
      dataIndex: 'enabled',
    },
    {
      title: 'Ajuste core',
      dataIndex: 'isCoreSetting',
    },
  ];
  const dataTableColumns = [
    {
      title: 'Ajuste',
      dataIndex: 'settingKey',
    },
    {
      title: 'Valor',
      dataIndex: 'settingValue',
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
              disabled={row.isCoreSetting}
              checked={row.enabled}
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          ),
        };
      },
    },
  ];

  const ADD_NEW_ENTITY = 'Añadir nuevo ajuste';
  const DATATABLE_TITLE = 'Listado de ajustes';
  const ENTITY_NAME = 'Ajustes avanzados';
  const CREATE_ENTITY = 'Crear ajuste';
  const UPDATE_ENTITY = 'Actualizar ajuste';
  const PANEL_TITLE = 'Panel de control';

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
      createForm={<AdvancedSettingsForm />}
      updateForm={<AdvancedSettingsForm isUpdateForm={true} />}
      config={config}
    />
  );
}
