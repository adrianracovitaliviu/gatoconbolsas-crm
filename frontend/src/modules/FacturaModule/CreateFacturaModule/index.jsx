import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import FacturaForm from '@/modules/FacturaModule/Forms/FacturaForm';

export default function CreateFacturaModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={FacturaForm} />
    </ErpLayout>
  );
}
