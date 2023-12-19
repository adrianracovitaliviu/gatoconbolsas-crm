import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';
import { useMoney } from '@/settings';
import calculate from '@/utils/calculate';

export default function ItemRowTop({ field, remove, current = null }) {
  const [totalState, setTotal] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const money = useMoney();
  const updateQt = (value) => {
    setQuantity(value);
  };
  const updatePrice = (value) => {
    setPrice(value);
  };

  useEffect(() => {
    if (current) {
      // When it accesses the /payment/Factura/ endpoint,
      // it receives an Factura.item instead of just item
      // and breaks the code, but now we can check if items exists,
      // and if it doesn't we can access Factura.items.

      const { items, Factura } = current;

      if (Factura) {
        const item = Factura[field.fieldKey];

        if (item) {
          setQuantity(item.quantity);
          setPrice(item.price);
        }
      } else {
        const item = items[field.fieldKey];

        if (item) {
          setQuantity(item.quantity);
          setPrice(item.price);
        }
      }
    }
  }, [current]);

  useEffect(() => {
    const currentTotal = calculate.multiply(price, quantity);

    setTotal(currentTotal.toFixed(2));
  }, [price, quantity]);

  return (
    <Row gutter={[12, 12]}>
    <Col className="gutter-row" span={12}>
      <Form.Item
        name={[field.name, 'itemName']}
        fieldKey={[field.fieldKey, 'itemName']}
        rules={[{ required: true, message: 'Falta producto.' }]}
      >
        <Input placeholder="Producto" />
      </Form.Item>
    </Col>
    <Col className="gutter-row" span={12}>
      <Form.Item
        name={[field.name, 'description']}
        fieldKey={[field.fieldKey, 'description']}
      >
        <Input placeholder="Descripción" />
      </Form.Item>
    </Col>
  </Row>
);
}