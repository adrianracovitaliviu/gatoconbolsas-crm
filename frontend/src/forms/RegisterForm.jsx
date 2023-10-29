import React from 'react';
import { Form, Input } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

export default function RegisterForm() {
  return (
    <>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Nombre"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
          {
            type: 'email',
            message: 'Email no válido.',
          },
        ]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="Email"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Contraseña"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="confirm_password"
        rules={[
          {
            required: true,
            message: 'Introduzca contraseña de nuevo.',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Las contraseñas no coinciden.'));
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Confirma la contraseña"
          size="large"
        />
      </Form.Item>
    </>
  );
}
