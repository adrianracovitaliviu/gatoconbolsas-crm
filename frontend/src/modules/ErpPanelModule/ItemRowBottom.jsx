import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col } from 'antd';

import { DeleteOutlined } from '@ant-design/icons';
import { useMoney } from '@/settings';
import calculate from '@/utils/calculate';

export default function ItemRowBottom({ field, remove, current = null }) {
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
    <Row gutter={[12, 12]} style={{ position: 'relative' }}>
    {/* Cantidad */}
    <Col className="gutter-row" span={8}>
      <Form.Item
        name={[field.name, 'quantity']}
        fieldKey={[field.fieldKey, 'quantity']}
        rules={[{ required: true, message: 'Introduzca cantidad.' }]}
      >
        <InputNumber style={{ width: '100%' }} min={0} onChange={setQuantity} />
      </Form.Item>
    </Col>

    {/* Precio */}
    <Col className="gutter-row" span={8}>
      <Form.Item
        name={[field.name, 'price']}
        fieldKey={[field.fieldKey, 'price']}
        rules={[{ required: true, message: 'Introduzca precio.' }]}
      >
      <InputNumber
            className="moneyInput"
            onChange={updatePrice}
            min={0}
            controls={false}
            addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
            addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
          />
      </Form.Item>
    </Col>

    {/* Total */}
    <Col className="gutter-row" span={8}>
      <Form.Item name={[field.name, 'total']}>
      <InputNumber
              readOnly
              className="moneyInput"
              value={totalState}
              min={0}
              controls={false}
              addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
              addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
              formatter={(value) => money.amountFormatter({ amount: value })}
            />
      </Form.Item>
    </Col>

    {/* Delete Icon */}
    <div style={{ position: 'absolute', right: '-20px', top: ' 5px' }}>
      <DeleteOutlined onClick={() => remove(field.name)} />
    </div>
  </Row>
);
}