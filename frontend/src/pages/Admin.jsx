import React from 'react';

import AdminCrudModule from '@/modules/AdminCrudModule';
import AdminForm from '@/forms/AdminForm';

export default function Admin() {
  const entity = 'admin';
  const searchConfig = {
    displayLabels: ['name', 'surname'],
    searchFields: 'email,name,surname',
    outputValue: '_id',
  };

  const PANEL_TITLE = 'Admin Panel';
  const dataTableTitle = 'Admin Lists';
  const entityDisplayLabels = ['email'];

  const readColumns = [
    { title: 'Nombre', dataIndex: 'name' },
    { title: 'Apellidos', dataIndex: 'surname' },
    { title: 'Email', dataIndex: 'email' },
    { title: "Rol", dataIndex: 'role' },
  ];

  const dataTableColumns = [
    { title: 'Nombre', dataIndex: 'name' },
    { title: 'Apellidos', dataIndex: 'surname' },
    { title: 'Email', dataIndex: 'email' },
    { title: "Rol", dataIndex: 'role' },
  ];
  const ADD_NEW_ENTITY = 'Añadir administrador';
  const DATATABLE_TITLE = 'Listado de administradores';
  const ENTITY_NAME = 'admin';
  const CREATE_ENTITY = 'Crear admin';
  const UPDATE_ENTITY = 'Actualizar admin';

  const config = {
    entity,
    PANEL_TITLE,
    dataTableTitle,
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
    <AdminCrudModule
      createForm={<AdminForm />}
      updateForm={<AdminForm isUpdateForm={true} />}
      config={config}
    />
  );
}
