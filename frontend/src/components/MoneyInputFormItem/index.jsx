import { Form, InputNumber } from 'antd';
import { useMoney } from '@/settings';

export default function MoneyInputFormItem({ updatePrice, value = 0, readOnly = false, formatter }) {
  const money = useMoney();

  return (
    <Form.Item>
      <InputNumber
        readOnly={readOnly}
        className="moneyInput"
        onChange={updatePrice}
        value={value}
        controls={false}
        addonAfter={money.currency_position === 'after' ? money.currency_symbol : undefined}
        addonBefore={money.currency_position === 'before' ? money.currency_symbol : undefined}
        formatter={formatter || ((value) => value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 }))}
        />
    </Form.Item>
  );
}
