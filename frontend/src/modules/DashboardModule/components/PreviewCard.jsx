import React, { useMemo } from 'react';
import { Col, Progress, Spin } from 'antd';

const colours = {
  borrador: '#595959',
  enviado: '#1890ff',
  pendiente: '#1890ff',
  impago: '#ffa940',
  vencido: '#ff4d4f',
  parcial: '#13c2c2',
  pagado: '#95de64',
  rechazado: '#ff4d4f',
  aceptado: '#95de64',
  cyan: '#13c2c2',
  purple: '#722ed1',
  vencido: '#614700',
};

const defaultStatistics = [
  {
    tag: 'borrador',
    value: 0,
  },
  {
    tag: 'pendiente',
    value: 0,
  },
  {
    tag: 'enviado',
    value: 0,
  },
  {
    tag: 'aceptado',
    value: 0,
  },
  {
    tag: 'rechazado',
    value: 0,
  },
  {
    tag: 'vencido',
    value: 0,
  },
];

const defaultInvoiceStatistics = [
  {
    tag: 'borrador',
    value: 0,
  },
  {
    tag: 'pendiente',
    value: 0,
  },
  {
    tag: 'vencido',
    value: 0,
  },
  {
    tag: 'pagado',
    value: 0,
  },
  {
    tag: 'impago',
    value: 0,
  },
  {
    tag: 'parcial',
    value: 0,
  },
];

const PreviewState = ({ tag, color, value }) => {
  return (
    <div style={{ color: '#595959', marginBottom: 5 }}>
      <div className="left alignLeft capitalize">{tag}</div>
      <div className="right alignRight">{value} %</div>
      <Progress
        percent={value}
        showInfo={false}
        strokeColor={{
          '0%': color,
          '100%': color,
        }}
      />
    </div>
  );
};

export default function PreviewCard({
  title = 'Resumen',
  statistics = defaultStatistics,
  isLoading = false,
  entity = 'invoice',
}) {
  const statisticsMap = useMemo(() => {
    if (entity === 'invoice') {
      return defaultInvoiceStatistics.map((defaultStat) => {
        const matchedStat = Array.isArray(statistics)
          ? statistics.find((stat) => stat.tag === defaultStat.tag)
          : null;
        return matchedStat || defaultStat;
      });
    } else {
      return defaultStatistics.map((defaultStat) => {
        const matchedStat = Array.isArray(statistics)
          ? statistics.find((stat) => stat.tag === defaultStat.tag)
          : null;
        return matchedStat || defaultStat;
      });
    }
  }, [statistics, entity]);

  const customSort = (a, b) => {
    const colorOrder = Object.values(colours);
    const indexA = colorOrder.indexOf(a.props.color);
    const indexB = colorOrder.indexOf(b.props.color);
    return indexA - indexB;
  };
  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 8 }}
      lg={{ span: 8 }}
    >
      <div className="pad15">
        <h3
          style={{
            color: '#22075e',
            marginBottom: 15,
          }}
        >
          {title}
        </h3>
        {isLoading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        ) : (
          statisticsMap
            ?.map((status, index) => (
              <PreviewState
                key={index}
                tag={status.tag}
                color={colours[status.tag]}
                value={status?.value}
              />
              // sort by colours
            ))
            .sort(customSort)
        )}
      </div>
    </Col>
  );
}
