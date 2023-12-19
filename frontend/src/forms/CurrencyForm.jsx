import React from 'react';
import { Switch, Form, Input } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

export default function CurrencyForm({ isUpdateForm = false }) {
  return (
    <>
      <Form.Item
        label="Divisa"
        name="name"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Símbolo"
        name="symbol"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
        ]}
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingRight: '5px',
        }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Decimales"
        name="decimal_separator"
        rules={[
          {
            required: true,
          },
        ]}
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingLeft: '5px',
        }}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Miles"
        name="thousand_separator"
        rules={[
          {
            required: true,
          },
        ]}
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingRight: '5px',
        }}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Predeterminado?"
        name="isDefault"
        rules={[
          {
            required: true,
          },
        ]}
        style={{
          display: 'inline-block',
          width: 'calc(50%)',
          paddingLeft: '5px',
        }}
        valuePropName="checked"
      >
        <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} />
      </Form.Item>
    </>
  );
}
