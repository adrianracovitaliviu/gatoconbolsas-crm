import { ErpLayout } from '@/layout';
import CreateItem from '@/modules/ErpPanelModule/CreateItem';
import AlbaranForm from '@/modules/AlbaranModule/Forms/AlbaranForm';

export default function CreateAlbaranModule({ config }) {
  return (
    <ErpLayout>
      <CreateItem config={config} CreateForm={AlbaranForm} />
    </ErpLayout>
  );
}
