import { useState } from 'react';
import { Form, Input, InputNumber, Select, Switch } from 'antd';

import { languages, tagColor } from '@/utils';

export default function MoneyFormSettingForm() {
  return (
    <>
      <Form.Item
        label="Divisa"
        name="currency"
        rules={[
          {
            required: true,
            message: 'Introduzca divisa.',
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        label="Símbolo"
        name="currency_symbol"
        rules={[
          {
            required: true,
            message: 'Introduzca símbolo',
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        label="Posición"
        name="currency_position"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio',
          },
        ]}
      >
        <Select>
          <Select.Option value="before">antes</Select.Option>
          <Select.Option value="after">después</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Decimal"
        name="decimal_sep"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        label="Miles"
        name="thousand_sep"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        label="Céntimos"
        name="cent_precision"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
        ]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        label="Formato Cero"
        name="zero_format"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
        ]}
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
    </>
  );
}
