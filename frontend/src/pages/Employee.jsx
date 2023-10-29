import React from 'react';

import CrudModule from '@/modules/CrudModule';
import EmployeeForm from '@/forms/EmployeeForm';
import dayjs from 'dayjs';
export default function Employee() {
  const entity = 'employee';
  const searchConfig = {
    displayLabels: ['name', 'surname'],
    searchFields: 'name,surname,birthday',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['name', 'surname'];

  const dataTableColumns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
    },
    {
      title: 'Apellido',
      dataIndex: 'surname',
    },
    {
      title: 'Nacimiento',
      dataIndex: 'birthday',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Departamento',
      dataIndex: 'department',
    },
    {
      title: 'Cargo',
      dataIndex: 'position',
    },
    {
      title: 'Número',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const readColumns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
    },
    {
      title: 'Apellido',
      dataIndex: 'surname',
    },
    {
      title: 'Nacimiento',
      dataIndex: 'birthday',
      isDate: true,
    },
    {
      title: 'Nacimiento',
      dataIndex: 'birthplace',
    },
    {
      title: 'Género',
      dataIndex: 'gender',
    },
    {
      title: 'Departamento',
      dataIndex: 'department',
    },
    {
      title: 'Cargo',
      dataIndex: 'position',
    },
    {
      title: 'Dirección',
      dataIndex: 'address',
    },
    {
      title: 'DNI',
      dataIndex: 'state',
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const ADD_NEW_ENTITY = 'Añadir empleado';
  const DATATABLE_TITLE = 'Listado de empleados';
  const ENTITY_NAME = 'empleado';
  const CREATE_ENTITY = 'Crear empleado';
  const UPDATE_ENTITY = 'Actualizar empleado';
  const PANEL_TITLE = 'Panel de empleados';

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
      createForm={<EmployeeForm />}
      updateForm={<EmployeeForm isUpdateForm={true} />}
      config={config}
    />
  );
}
