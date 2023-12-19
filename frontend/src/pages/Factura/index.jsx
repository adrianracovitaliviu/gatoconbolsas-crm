import dayjs from 'dayjs';
import { Tag } from 'antd';
import configPage from './config';
import { useMoney } from '@/settings';
import FacturaDataTableModule from '@/modules/FacturaModule/FacturaDataTableModule';

export default function Factura() {
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
      title: 'Total',
      dataIndex: 'total',
      render: (amount) => moneyRowFormatter({ amount }),
    },
    {
      title: 'pagado',
      dataIndex: 'credit',
      render: (amount) => moneyRowFormatter({ amount }),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      render: (status) => {
        let color = status === 'borrador' ? 'cyan' : status === 'enviado' ? 'magenta' : 'gold';

        return <Tag color={color}>{status && status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Pago',
      dataIndex: 'paymentStatus',
      render: (paymentStatus) => {
        let color =
          paymentStatus === 'impago'
            ? 'volcano'
            : paymentStatus === 'pagado'
            ? 'green'
            : paymentStatus === 'vencido'
            ? 'red'
            : 'purple';

        return <Tag color={color}>{paymentStatus && paymentStatus.toUpperCase()}</Tag>;
      },
    },
  ];

  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return <FacturaDataTableModule config={config} />;
}
