import React from 'react';
import { Button, Form, Input } from 'antd';
import { validatePhoneNumber } from '@/utils/helpers';

export default function ProductoForm({ isUpdateForm = false }) {
  const validateEmptyString = (_, value) => {
    if (value && value.trim() === '') {
      return Promise.reject(new Error('Field cannot be empty'));
    }

    return Promise.resolve();
  };

  return (
    <>
      <Form.Item
        label="Código"
        name="codigo"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
          {
            validator: validateEmptyString,
            message: 'Valor no válido.',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Descripción"
        name="descripcion"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
          {
            validator: validateEmptyString,
            message: 'Valor no válido.',
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
        label="Precio"
        name="precio"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
          {
            validator: validateEmptyString,
            message: 'Valor no válido.',
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
        name="familia"
        label="Familia"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
          {
            validator: validateEmptyString,
            message: 'Valor no válido.',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
