import dayjs from 'dayjs';
import { Tag } from 'antd';
import React from 'react';

import CrudModule from '@/modules/CrudModule';
import LeadForm from '@/forms/LeadForm';

import configPage from './config';

export default function Lead() {
  const searchConfig = {
    displayLabels: ['firstname', 'company'],
    searchFields: 'firstname,company',
    outputValue: '_id',
  };
  const entityDisplayLabels = ['number', 'company'];

  const readColumns = [
    {
      title: 'Nombre',
      dataIndex: 'firstName',
    },

    {
      title: 'Apellidos',
      dataIndex: 'lastName',
    },
    {
      title: 'Empresa',
      dataIndex: 'company',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
    },
  ];

  const dataTableColumns = [
    {
      title: 'Nombre',
      dataIndex: ['firstName'],
    },
    {
      title: 'Apellidos',
      dataIndex: ['lastName'],
    },
    {
      title: 'Empresa',
      dataIndex: ['company'],
    },
    {
      title: 'Email',
      dataIndex: ['email'],
    },
    {
      title: 'Teléfono',
      dataIndex: ['phone'],
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      render: (status) => {
        let color =
          status === 'new'
            ? 'cyan'
            : status === 'reached'
            ? 'blue'
            : status === 'interested'
            ? 'green'
            : status === 'not interested'
            ? 'orange'
            : 'red';
        return <Tag color={color}>{status && status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Creado el',
      dataIndex: 'created',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
  ];

  const config = {
    ...configPage,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <CrudModule
      createForm={<LeadForm />}
      updateForm={<LeadForm isUpdateForm={true} />}
      config={config}
    />
  );
}
