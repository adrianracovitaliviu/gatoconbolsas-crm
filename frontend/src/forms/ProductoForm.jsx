import React from 'react';
import { Button, Form, Input } from 'antd';
import { validatePhoneNumber } from '@/utils/helpers';

export default function CustomerForm({ isUpdateForm = false }) {
  const validateEmptyString = (_, value) => {
    if (value && value.trim() === '') {
      return Promise.reject(new Error('Field cannot be empty'));
    }

    return Promise.resolve();
  };

  return (
    <>
      <Form.Item
        label="Empresa"
        name="company"
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
        label="CIF"
        name="managerSurname"
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
        label="Nombre"
        name="managerName"
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
        name="phone"
        label="Tarifa"
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
        label="Dirección"
        name="address"
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
        name="email"
        label="Email"
        rules={[
          {
            type: 'email',
            message: 'Campo obligatorio.',
          },
          {
            required: false,
            message: 'Email no válido.',
          },
          {
            validator: validateEmptyString,
            message: 'Email no válido.',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
