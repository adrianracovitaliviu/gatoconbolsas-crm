import { Tag } from 'antd';

export function StatusTag(status = 'borrador') {
  let color =
    status === 'borrador'
      ? 'cyan'
      : status === 'enviado'
      ? 'blue'
      : status === 'pagado'
      ? 'green'
      : status === 'vencido'
      ? 'orange'
      : 'red';

  return <Tag color={color}>{status && status.toUpperCase()}</Tag>;
}
