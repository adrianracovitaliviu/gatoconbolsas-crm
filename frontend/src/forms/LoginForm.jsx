import React from 'react';
import { Form, Input, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function LoginForm() {
  return (
    <>
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
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="admin@elgatoconbolsas.es"
          type="email"
          autoComplete="email"
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
          placeholder="gato2023."
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Recuérdame</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          ¿Olvidaste la contraseña?
        </a>
      </Form.Item>
    </>
  );
}
