import * as React from 'react';
import { render, screen, act } from '@testing-library/react';

import { Provider } from 'react-redux';

import store from '@/redux/store';
import { CrudContextProvider } from '@/context/crud';

import ReadItem from './index';
import FeedStoreMock from '@/test/mocksComponent/FeedStoreMock';
import { crud } from '@/redux/crud/actions';

const data = {
  company: 'El Gato con Bolsas',
  managerSurname: 'Moreno Osma',
  managerName: 'Iván',
  email: 'admin@elgatoconbolsas.es',
  phone: '123123123',
};

const readColumns = [
  {
    title: 'Empresa',
    dataIndex: 'company',
  },
  {
    title: 'Apellidos',
    dataIndex: 'managerSurname',
  },
  {
    title: 'Nombre',
    dataIndex: 'managerName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Teléfono',
    dataIndex: 'phone',
  },
];

const config = { readColumns };

const RenderedComponent = () => {
  return (
    <Provider store={store}>
      <FeedStoreMock method={crud.currentItem} data={data} />
      <CrudContextProvider>
        <ReadItem config={config} />
      </CrudContextProvider>
    </Provider>
  );
};

describe('Integration Testing : Read Component', () => {
  test('renders read component', () => {
    const { debug } = render(<RenderedComponent />);
    act(() => debug());
  });
});
