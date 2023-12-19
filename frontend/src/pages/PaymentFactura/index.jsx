import dayjs from 'dayjs';
import configPage from './config';
import PaymentFacturaDataTableModule from '@/modules/PaymentFacturaModule/PaymentFacturaDataTableModule';

export default function PaymentFactura() {
  const searchConfig = {
    displayLabels: ['number'],
    searchFields: 'number',
    outputValue: '_id',
  };

  const entityDisplayLabels = ['number'];
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
      title: 'Cantidad',
      dataIndex: 'amount',
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Número de factura',
      dataIndex: ['Factura', 'number'],
    },
    {
      title: 'Año de factura',
      dataIndex: ['Factura', 'year'],
    },
    {
      title: 'Método de pago',
      dataIndex: ['paymentMode', 'name'],
    },
  ];

  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return <PaymentFacturaDataTableModule config={config} />;
}
