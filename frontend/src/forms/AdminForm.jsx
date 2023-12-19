import SelectAsync from '@/components/SelectAsync';
import { Form, Input, Select } from 'antd';

export default function AdminForm({ isUpdateForm = false }) {
  return (
    <>
      <Form.Item
        label="Nombre"
        name="name"
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
        label="Apellidos"
        name="surname"
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
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
          {
            type: 'email',
            message: 'El email no es válido.',
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      {!isUpdateForm && (
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: 'Campo obligatorio.',
            },
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
      )}
      <Form.Item
        label="Rol"
        name="role"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio.',
          },
        ]}
      >
        <Select>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="staff">Empleado</Select.Option>
        </Select>
      </Form.Item>
    </>
  );
}
