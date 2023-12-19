import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';
import './width.css'
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { DatePicker } from '@/components/CustomAntd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';

import ItemRow from '@/modules/ErpPanelModule/ItemRow';
import ItemRowTop from '@/modules/ErpPanelModule/ItemRowTop';
import ItemRowBottom from '@/modules/ErpPanelModule/ItemRowBottom';
import MoneyInputFormItem from '@/components/MoneyInputFormItem';
import calculate from '@/utils/calculate';


export default function FacturaForm({ subTotal = 0, current = null }) {

  const [precioOptions, setPrecioOptions] = useState([]);
  const [descripcionOptions, setDescripcionOptions] = useState([]);
  const [facturas, setNumeroFactura] = useState(null);

  const handleCodigoSelect = async (codigo) => {
    try {
      const response = await fetch(`/api/producto/read/${codigo}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Received data:', data);
  
        // Assuming data.precioOptions and data.descripcionOptions are arrays
        setPrecioOptions(data.precioOptions || []);
        setDescripcionOptions(data.descripcionOptions || []);
      } else {
        console.error('Error fetching product information:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching product information:', error);
    }
  };

  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear());
  const [total, setTotal] = useState(0);
  const [taxRate, setTaxRate] = useState(0); 
  const [taxTotal, setTaxTotal] = useState(0);
  const [recargo, setRecargo] = useState(0); // Default recargo is set to 0
  const [recargoTotal, setRecargoTotal] = useState(0);

  const handleTaxChange = (value) => {
    setTaxRate(value.toFixed(2));
  };

  const recargoChange = (value) => {
    setRecargo(value.toFixed(2) / 1000);
  };

  useEffect(() => {

    axios.get('/api/Facturas/getUltimoNumero', { withCredentials: true })
    .then(response => {
      const numeroFactura = response.data.ultimoNumero; // Ajusta esto según la estructura de tu respuesta
      setNumeroFactura(numeroFactura + 1);
    })
    .catch(err => {
      console.error("Error al obtener el número de factura:", err);
      // Aquí podrías manejar el error de manera más específica si es necesario
    });

    {/* const fetchNumeroFactura = async () => {
      try {
        const response = await fetch('/api/Factura/getUltimoNumero');
        console.log(await response.text());
        console.log(response.headers.get("Content-Type"));  // Esto mostrará la respuesta completa como texto
        if (response.ok) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            setNumeroFactura(data.ultimoNumero + 1);
          } else {
            console.log("No se recibió JSON");
          }
        } else {
          console.error('Error al obtener el número de factura:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener el número de factura:', error);
      }
    };

  fetchNumeroFactura(); */}

    // Calculate tax based on selected taxRate
    const taxValue = calculate.multiply(subTotal, taxRate);

    // Calculate recargo based on selected recargo rate
    const recargoValue = calculate.multiply(subTotal, recargo);

    // Calculate total: subTotal + tax + recargo
    const currentTotal = calculate.add(subTotal, taxValue);

    // Update state variables
    setTaxTotal(taxValue.toFixed(2));
    setRecargoTotal(recargoValue.toFixed(2));

    // Calculate total with recargo and update state
    const total = calculate.add(currentTotal, recargoValue).toFixed(2);
    setTotal(total);
  }, [subTotal, taxRate, recargo]);

  const formattedTotal = Number(total).toFixed(2);

/*  useEffect(() => {
    const currentTotal = calculate.add(
      calculate.add(calculate.multiply(subTotal, taxRate), subTotal),
      recargoTotal
    ).toFixed(2);
    setTaxTotal(Number.parseFloat(calculate.multiply(subTotal, taxRate)).toFixed(2));
    setRecargo(Number.parseFloat(calculate.multiply(subTotal, recargo)).toFixed(2));
    setTotal(Number.parseFloat(currentTotal).toFixed(2));
  }, [subTotal, taxRate, recargo, recargoTotal]); */

  const addField = useRef(false);

  useEffect(() => {
    addField.current.click();
  }, []);

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={9}>
          <Form.Item
            name="client"
            label="Cliente"
            rules={[
              {
                required: true,
                message: 'Introduzca un cliente.',
              },
            ]}
          >
            <AutoCompleteAsync
              entity={'client'}
              displayLabels={['company']}
              searchFields={'company'}
              // onUpdateValue={autoCompleteUpdate}
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}>
        <Form.Item
          label="Número"
          name="number"
          rules={[
            {
              required: true,
              message: 'Introduzca número de factura.',
            },
          ]}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}>
          <Form.Item
            label="Año"
            name="year"
            initialValue={currentYear}
            rules={[
              {
                required: true,
                message: 'Introduzca año de factura.',
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={5}>
          <Form.Item
            label="Estado"
            name="status"
            rules={[
              {
                required: false,
                message: 'Introduzca estado de la factura.',
              },
            ]}
            initialValue={'pendiente'}
          >
            <Select
              options={[
                { value: 'borrador', label: 'Borrador' },
                { value: 'pendiente', label: 'Pendiente' },
                { value: 'enviado', label: 'Enviada' },
              ]}
            ></Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={9}>
          <Form.Item label="Nota" name="note">
            <Input />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={8}>
          <Form.Item
            name="date"
            label="Fecha"
            rules={[
              {
                required: true,
                type: 'object',
              },
            ]}
            initialValue={dayjs()}
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={7}>
          <Form.Item
            name="expiredDate"
            label="Vencimiento"
            rules={[
              {
                required: false,
                type: 'object',
              },
            ]}
            initialValue={dayjs().add(30, 'days')}
          >
            <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} />
          </Form.Item>
        </Col>
      </Row>
      <Divider dashed />
  {/* First Row for Producto and Descripción */}
  <Row gutter={[12, 12]} style={{ position: 'relative' }}>
    <Col className="gutter-row mobile-full-width" span={4}>
    <p>Código</p>
    </Col>
    <Col className="gutter-row mobile-full-width" span={5}>
      <p>Descripción</p>
    </Col>
    <Col className="gutter-row mobile-full-width" span={3}>
      <p>Cant.</p>
    </Col>
    <Col className="gutter-row mobile-full-width" span={6}>
      <p>Precio</p>
    </Col>
    <Col className="gutter-row mobile-full-width" span={6}>
      <p>Total</p>
    </Col>
  </Row>
{/*<Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <ItemRowTop key={field.key} remove={remove} field={field} current={current}></ItemRowTop>
            ))}
                  </>
        )}
            </Form.List>*/}
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <ItemRow key={field.key} remove={remove} field={field} current={current}></ItemRow>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                ref={addField}
              >
                Añadir producto
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Divider dashed />
      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
        <Row gutter={[2, -5]}>
          <Col className="gutter-row" 
            span={10}
          >
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                Guardar factura
              </Button>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={6} offset={2}>
            <p
              style={{
                paddingLeft: '12px',
                paddingTop: '5px',
              }}
            >
              Subtotal :
            </p>
          </Col>
          <Col className="gutter-row" span={6}>
            <MoneyInputFormItem readOnly value={subTotal.toFixed(2)} />
          </Col>
        </Row>
        <Row gutter={[6, -5]}>
          <Col className="gutter-row" span={7} offset={11}>
            <Form.Item
              name="taxRate"
              rules={[
                {
                  required: false,
                  message: 'Introduzca I.V.A.',
                },
              ]}
              initialValue="No I.V.A."
            >
              <Select
                value={taxRate}
                onChange={handleTaxChange}
                bordered={false}
                options={[
                  { value: 0, label: 'I.V.A. 0%' },
                  { value: 0.21, label: 'I.V.A. 21%' },
                ]}
              ></Select>
            </Form.Item> 
          </Col>
          <Col className="gutter-row" span={6}>
            <MoneyInputFormItem readOnly value={taxTotal} />
          </Col>
        </Row>

        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={7} offset={11}>
            <Form.Item
              name="recargo"
              rules={[
                {
                  required: false,
                  message: 'Introduzca recargo.',
                },
              ]}
              initialValue="¿Recargo?"
            >
              <Select
                value={recargo}
                onChange={recargoChange}
                bordered={false}
                options={[
                  { value: 0, label: 'Sin recargo' },
                  { value: 52, label: 'Recargo 5.2%' }, // recargo value is 5.2%
                ]}
              ></Select>

            </Form.Item> 
          </Col>
          <Col className="gutter-row" span={6}>
            <MoneyInputFormItem readOnly value={recargoTotal} />
          </Col>
        </Row>

        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={4} offset={14}>
            <p
              style={{
                paddingLeft: '12px',
                paddingTop: '5px',
              }}
            >
              Total :
            </p>
          </Col>
          <Col className="gutter-row" span={6}>
            <MoneyInputFormItem readOnly value={formattedTotal} />
          </Col>
        </Row>
      </div>
    </>
  );
}