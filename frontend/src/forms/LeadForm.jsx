import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

export default function LeadForm() {
  return (
    <>
      <Form.Item
        label="Nombre"
        name="firstName"
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
        label="Apellidos"
        name="lastName"
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
        label="Email"
        name="email"
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
        label="Teléfono"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
        ]}
      >
        <Input type="tel" />
      </Form.Item>

      <Form.Item
        label="Empresa"
        name="company"
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
        label="Trabajo"
        name="jobTitle"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Dirección" name="address">
        <Input />
      </Form.Item>

      <Form.Item label="País" name="country">
        <Input />
      </Form.Item>

      <Form.Item
        label="Estado"
        name="status"
        rules={[
          {
            required: false,
            message: 'Campo obligatorio.',
          },
        ]}
        initialValue={'new'}
      >
        <Select
          options={[
            { value: 'new', label: 'Nuevo' },
            { value: 'reached', label: 'Usual' },
            { value: 'interested', label: 'Nacional' },
            { value: 'not interested', label: 'Internacional' },
          ]}
        ></Select>
      </Form.Item>

      <Form.Item label="Notas" name="note">
        <Input />
      </Form.Item>

      <Form.Item label="Contacto" name="source">
        <Input placeholder="ex: linkedin, website, ads..." />
      </Form.Item>
    </>
  );
}
