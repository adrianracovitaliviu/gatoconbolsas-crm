import React from 'react';
import { Form, Input, Button, Radio, Select, Switch } from 'antd';
import { DatePicker, TimePicker, Calendar } from '@/components/CustomAntd';
import { validatePhoneNumber } from '@/utils/helpers';

export default function EmployeeForm() {
  return (
    <>
      <Form.Item
        name="name"
        label="Nombre"
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
        name="surname"
        label="Apellidos"
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
        name="birthday"
        label="Nacimiento"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
        ]}
      >
        <DatePicker format={'DD/MM/YYYY'} />
      </Form.Item>
      <Form.Item
        name="birthplace"
        label="Localidad"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Género"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select>
          <Select.Option value="men">Hombre</Select.Option>
          <Select.Option value="women">Mujer</Select.Option>
        </Select>
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
            required: true,
            message: 'Email no válido.',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Teléfono"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
          {
            pattern: validatePhoneNumber, // importing regex from helper.js utility file to validate
            message: 'Teléfono no válido.',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="department"
        label="Departemento"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="position"
        label="Cargo"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Dirección"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="state"
        label="Estado"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
