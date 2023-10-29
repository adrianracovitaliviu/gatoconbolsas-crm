import dayjs from 'dayjs';
import configPage from './config';
import PaymentInvoiceDataTableModule from '@/modules/PaymentInvoiceModule/PaymentInvoiceDataTableModule';

export default function PaymentInvoice() {
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
      dataIndex: ['invoice', 'number'],
    },
    {
      title: 'Año de factura',
      dataIndex: ['invoice', 'year'],
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
  return <PaymentInvoiceDataTableModule config={config} />;
}
