import React from 'react';
import configPage from './config';
import CrudModule from '@/modules/CrudModule';
import AdvancedSettingsForm from '@/forms/AdvancedSettingsForm';
import EmailDataTableModule from '@/modules/EmailModule/EmailDataTableModule';

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

  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return <EmailDataTableModule config={config} />;
}
