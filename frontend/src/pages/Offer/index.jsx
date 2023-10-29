import dayjs from 'dayjs';
import { Tag } from 'antd';

import OfferDataTableModule from '@/modules/OfferModule/OfferDataTableModule';
import { useMoney } from '@/settings';
import configPage from './config';

export default function Offer() {
  const { moneyRowFormatter } = useMoney();

  const searchConfig = {
    displayLabels: ['company'],
    searchFields: 'company',
  };
  const entityDisplayLabels = ['number', 'lead.company'];
  const dataTableColumns = [
    {
      title: 'Número',
      dataIndex: 'number',
    },
    {
      title: 'Empresa',
      dataIndex: ['lead', 'company'],
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
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
      title: 'Notas',
      dataIndex: 'note',
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
            : status === 'aceptado'
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
  return <OfferDataTableModule config={config} />;
}
