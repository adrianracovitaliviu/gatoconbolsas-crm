import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import PaymentFacturaForm from '@/modules/PaymentFacturaModule/Forms/PaymentFacturaForm';

export default function CreatePaymentFacturaModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={PaymentFacturaForm} />
    </ErpLayout>
  );
}
