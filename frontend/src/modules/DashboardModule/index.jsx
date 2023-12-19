import React from 'react';
import { Tag, Row, Col } from 'antd';

import { DashboardLayout } from '@/layout';

import { request } from '@/request';
import useFetch from '@/hooks/useFetch';

import RecentTable from './components/RecentTable';

import SummaryCard from './components/SummaryCard';
import PreviewCard from './components/PreviewCard';
import CustomerPreviewCard from './components/CustomerPreviewCard';

const dataTableColumns = [
  {
    title: 'N#',
    dataIndex: 'number',
    style: { width: 150 },
  },
  {
    title: 'Cliente',
    dataIndex: ['client', 'company'],
    width: 200, // Set the width for this column (in pixels)

  },

  {
    title: 'Total',
    dataIndex: 'total',
    width: 100, // Set the width for this column (in pixels)
    render: (total) => `€ ${total}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
  },
  {
    title: 'Estado',
    dataIndex: 'status',
    width: 100, // Set the width for this column (in pixels)
    render: (status) => {
      let color = status === 'borrador' ? 'volcano' : 'green';

      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
];

function formatCurrency(value) {
  return `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export default function DashboardModule() {
  const { result: FacturaResult, isLoading: FacturaLoading } = useFetch(() =>
    request.summary({ entity: 'Factura' })
  );

  const { result: AlbaranResult, isLoading: AlbaranLoading } = useFetch(() =>
    request.summary({ entity: 'Albaran' })
  );

  const { result: offerResult, isLoading: offerLoading } = useFetch(() =>
    request.summary({ entity: 'offer' })
  );

  const { result: paymentResult, isLoading: paymentLoading } = useFetch(() =>
    request.summary({ entity: 'payment/Factura' })
  );

  const { result: clientResult, isLoading: clientLoading } = useFetch(() =>
    request.summary({ entity: 'client' })
  );

  const entityData = [
    {
      result: FacturaResult,
      isLoading: FacturaLoading,
      entity: 'Factura',
    },
    {
      result: AlbaranResult,
      isLoading: AlbaranLoading,
      entity: 'Albaran',
    },
    {
      result: offerResult,
      isLoading: offerLoading,
      entity: 'offer',
    },
    {
      result: paymentResult,
      isLoading: paymentLoading,
      entity: 'payment',
    },
  ];

  const cards = entityData.map((data, index) => {
    const { result, entity, isLoading } = data;

    if (entity === 'offer') return null;

    return (
      <SummaryCard
        key={index}
        title={data?.entity === 'paymentFactura' ? 'Payment' : data?.entity}
        tagColor={
          data?.entity === 'Factura' ? 'cyan' : data?.entity === 'Albaran' ? 'purple' : 'green'
        }
        prefix={'Este mes'}
        isLoading={isLoading}
        tagContent={result?.total && formatCurrency(result?.total)}
      />
    );
  });

  const statisticCards = entityData.map((data, index) => {
    const { result, entity, isLoading } = data;

    if (entity === 'payment') return null;

    return (
      <PreviewCard
        key={index}
        title={`Resumen ${data?.entity.charAt(0).toUpperCase() + data?.entity.slice(1)}`}
        isLoading={isLoading}
        entity={entity}
        statistics={
          !isLoading &&
          result?.performance?.map((item) => ({
            tag: item?.status,
            color: 'blue',
            value: item?.percentage,
          }))
        }
      />
    );
  });

  return (
    <DashboardLayout>
      <Row gutter={[24, 24]}>
        {cards}
        <SummaryCard
          title={'pendiente'}
          tagColor={'red'}
          prefix={'No pagado'}
          isLoading={FacturaLoading}
          tagContent={
            FacturaResult?.total_undue &&
            `€ ${FacturaResult?.total_undue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
          }
        />
      </Row>
      <div className="space30"></div>
      <Row gutter={[14, 24]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 18 }}>
          <div className="whiteBox shadow" style={{ minHeight: '380px', height: '100%' }}>
            <Row className="pad10" gutter={[0, 0]}>
              {statisticCards}
            </Row>
          </div>
        </Col>
        <Col className="gutter-row w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
          <CustomerPreviewCard
            isLoading={clientLoading}
            activeCustomer={clientResult?.active}
            newCustomer={clientResult?.new}
          />
        </Col>
      </Row>
      <div className="space30"></div>
      <Row gutter={[14, 24]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow" style={{ height: '100%' }}>
            <div className="pad20">
              <h3 style={{ color: '#22075e', marginBottom: 5 }}>Últimas Facturas</h3>
            </div>

            <RecentTable entity={'Factura'} dataTableColumns={dataTableColumns} />
          </div>
        </Col>

        <Col className="gutter-row w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
          <div className="whiteBox shadow" style={{ height: '100%' }}>
            <div className="pad20">
              <h3 style={{ color: '#22075e', marginBottom: 5 }}>Últimos Albaranes</h3>
            </div>
            <RecentTable entity={'Albaran'} dataTableColumns={dataTableColumns} />
          </div>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
