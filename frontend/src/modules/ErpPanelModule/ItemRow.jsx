import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col } from 'antd';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { DeleteOutlined } from '@ant-design/icons';
import { useMoney } from '@/settings';
import calculate from '@/utils/calculate';

export default function ItemRow({ field, remove, current, form = null }) {
  const [totalState, setTotal] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const fetchProductData = async (codigo) => {
    try {
      // URL real de tu API
      const response = await fetch(`https://gatoconbolsas-crm-backend.onrender.com/api/productos/${codigo}`);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener datos del producto: ", error);
      return null; // Devuelve null o maneja el error como prefieras
    }
  };

  const money = useMoney();
  const updateQt = (value) => {
    setQuantity(value);
  };
  const updatePrice = (value) => {
    setPrice(value);
  };

  {/* const handleAutoCompleteChange = (codigo) => {
    form.setFieldsValue({ [field.name]: { ...form.getFieldValue(field.name), itemName: codigo } });
  };*/}

  const handleAutoCompleteChange = async (codigo) => {
    form.setFieldsValue({ [field.name]: { ...form.getFieldValue(field.name), itemName: codigo } });
    try {
      const productos = await fetchProductData(codigo);
      if (productos) {
        // Suponiendo que productData contiene los campos 'price' y 'description'
        setPrice(productos.precio);
        form.setFieldsValue({ [field.name]: { ...form.getFieldValue(field.name), price: productos.precio } });
        form.setFieldsValue({ [field.name]: { ...form.getFieldValue(field.name), description: productos.descripcion } });
      }
    } catch (error) {
      console.error("Error al obtener datos del producto: ", error);
    }
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
      <Col className="gutter-row" span={4}>
    <Form.Item
          name={[field.name, 'itemName']}
          fieldKey={[field.fieldKey, 'itemName']}
            rules={[
              {
                required: true,
                message: 'Introduzca un codigo.',
              },
            ]}
          >
            <AutoCompleteAsync
              entity={'producto'}
              displayLabels={['codigo']}
              searchFields={'codigo'}
              value={handleAutoCompleteChange}
              outputValue='codigo'
            />
          </Form.Item>
      </Col>
      <Col className="gutter-row" span={5}>
        <Form.Item name={[field.name, 'description']} fieldKey={[field.fieldKey, 'description']}>
          <Input placeholder="Descripción" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={3}>
        <Form.Item
          name={[field.name, 'quantity']}
          fieldKey={[field.fieldKey, 'quantity']}
          rules={[{ required: true, message: 'Introduzca cantidad.' }]}
        >
          <InputNumber style={{ width: '100%' }} min={0} onChange={updateQt} />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={6}>
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
      <Col className="gutter-row" span={6}>
        <Form.Item name={[field.name, 'total']}>
          <Form.Item>
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
        </Form.Item>
      </Col>

      <div style={{ position: 'absolute', right: '-12px', top: ' 5px' }}>
        <DeleteOutlined onClick={() => remove(field.name)} />
      </div>
    </Row>
  );
}
