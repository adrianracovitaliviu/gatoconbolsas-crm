import { Switch, Form, Input } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectCurrentItem } from '@/redux/crud/selectors';

export default function AdvancedSettingsForm({ isUpdateForm = false }) {
  const { result } = useSelector(selectCurrentItem);
  return (
    <>
      <Form.Item
        label="Ajuste"
        name="settingKey"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Valor"
        name="settingValue"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Ajuste activo"
        name="enabled"
        style={{
          display: 'inline-block',
          width: '100%',
          paddingRight: '5px',
        }}
        valuePropName="checked"
        initialValue={true}
      >
        <Switch
          disabled={result ? result.isCoreSetting : false}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
    </>
  );
}
