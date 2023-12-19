import { ErpLayout } from '@/layout';
import PaymentFacturaERP from './components/PaymentFacturaERP';
import DataTableDropMenu from './components/DataTableDropMenu';

export default function PaymentFacturaDataTableModule({ config }) {
  return (
    <ErpLayout>
      <PaymentFacturaERP config={config} DataTableDropMenu={DataTableDropMenu}></PaymentFacturaERP>
    </ErpLayout>
  );
}
