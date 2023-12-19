import React from 'react';

import CrudModule from '@/modules/CrudModule';
import ProductoForm from '@/forms/ProductoForm';

function Producto() {
  const entity = 'producto';
  const searchConfig = {
    displayLabels: ['company'],
    searchFields: 'company,managerSurname,managerName',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['company'];

  const readColumns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
    },
    {
      title: 'Familia',
      dataIndex: 'familia',
    },
  ];
  const dataTableColumns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
    },
    {
      title: 'Precio',
      dataIndex: 'precio',
    },
    {
      title: 'Familia',
      dataIndex: 'familia',
    },
  ];

  const ADD_NEW_ENTITY = 'Añadir producto';
  const DATATABLE_TITLE = 'Listado de productos';
  const ENTITY_NAME = 'producto';
  const CREATE_ENTITY = 'Crear producto';
  const UPDATE_ENTITY = 'Actualizar producto';
  const PANEL_TITLE = 'Panel de producto';

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
      createForm={<ProductoForm />}
      updateForm={<ProductoForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Producto;
