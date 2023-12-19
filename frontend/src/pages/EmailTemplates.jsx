import React from 'react';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import CrudModule from '@/modules/CrudModule';
import AdvancedSettingsForm from '@/forms/AdvancedSettingsForm';

export default function AdvancedSettings() {
  const entity = 'email';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['name'];

  const readColumns = [
    {
      title: 'Plantilla',
      dataIndex: 'emailName',
    },
    {
      title: 'Asunto',
      dataIndex: 'emailSubject',
    },
    {
      title: 'Mensaje',
      dataIndex: 'emailBody',
    },
  ];
  const dataTableColumns = [
    {
      title: 'Plantilla',
      dataIndex: 'emailName',
    },
    {
      title: 'Asunto',
      dataIndex: 'emailSubject',
      key: 'emailSubject',
      render: (text, row) => {
        return {
          children: <span>{text}</span>,
        };
      },
    },
  ];

  const ADD_NEW_ENTITY = 'Añadir ajuste';
  const DATATABLE_TITLE = 'Plantillas';
  const ENTITY_NAME = 'Ajustes de plantilla';
  const CREATE_ENTITY = 'Crear ajuste';
  const UPDATE_ENTITY = 'Actualizar plantilla';
  const PANEL_TITLE = 'Panel de plantillas';

  const config = {
    entity,
    PANEL_TITLE,
    ENTITY_NAME,
    CREATE_ENTITY,
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
