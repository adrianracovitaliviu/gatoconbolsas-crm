import dayjs from 'dayjs';
import { Tag } from 'antd';

import AlbaranDataTableModule from '@/modules/AlbaranModule/AlbaranDataTableModule';
import { useMoney } from '@/settings';
import configPage from './config';

export default function Albaran() {
  const { moneyRowFormatter } = useMoney();

  const searchConfig = {
    displayLabels: ['name', 'surname'],
    searchFields: 'name,surname,birthday',
  };
  const entityDisplayLabels = ['number', 'client.company'];
  const dataTableColumns = [
    {
      title: 'Número',
      dataIndex: 'number',
    },
    {
      title: 'Cliente',
      dataIndex: ['client', 'company'],
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Vencimiento',
      dataIndex: 'expiredDate',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Subtotal',
      dataIndex: 'subTotal',
      render: (amount) => moneyRowFormatter({ amount }),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      render: (amount) => moneyRowFormatter({ amount }),
    },

    {
      title: 'Estado',
      dataIndex: 'status',
      render: (status) => {
        let color =
          status === 'borrador'
            ? 'cyan'
            : status === 'enviado'
            ? 'blue'
            : status === 'pagado'
            ? 'green'
            : status === 'vencido'
            ? 'orange'
            : 'red';
        return <Tag color={color}>{status && status.toUpperCase()}</Tag>;
      },
    },
  ];

  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return <AlbaranDataTableModule config={config} />;
}
