import React from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber } from 'antd';
import { DatePicker } from '@/components/CustomAntd';
import SelectAsync from '@/components/SelectAsync';
import { useMoney } from '@/settings';
export default function PaymentInvoiceForm({ maxAmount = null, isUpdateForm = false }) {
  const { TextArea } = Input;
  const money = useMoney();
  return (
    <>
      <Form.Item
        label="Número"
        name="number"
        initialValue={1}
        rules={[
          {
            required: true,
          },
        ]}
        style={{ width: '50%', float: 'left', paddingRight: '20px' }}
      >
        <InputNumber min={1} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="date"
        label="Fecha"
        rules={[
          {
            required: true,
            type: 'object',
          },
        ]}
        initialValue={dayjs().add(30, 'days')}
        style={{ width: '50%' }}
      >
        <DatePicker format={'DD/MM/YYYY'} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="Cantidad"
        name="amount"
        rules={[{ required: true, message: 'Campo obligatorio.' }]}
      >
        <InputNumber
          className="moneyInput"
          min={0}
          controls={false}
          max={maxAmount}
          addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
          addonBefore={money.currency_position === 'before' ? money.currency_symbol : null}
        />
      </Form.Item>
      <Form.Item
        label="Método de pago"
        name="paymentMode"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <SelectAsync
          entity={'paymentMode'}
          displayLabels={['name']}
          withRedirect={true}
          urlToRedirect="/payment/mode"
          redirectLabel="Añadir método de pago"
        ></SelectAsync>
      </Form.Item>
      <Form.Item label="Referencia" name="ref">
        <Input />
      </Form.Item>
      <Form.Item label="Descripción" name="description">
        <TextArea />
      </Form.Item>
    </>
  );
}
