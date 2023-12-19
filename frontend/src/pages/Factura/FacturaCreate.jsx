import configPage from './config';
import CreateFacturaModule from '@/modules/FacturaModule/CreateFacturaModule';

const customConfig = {
  /*your custom config*/
};
const config = {
  ...configPage,
  //customConfig,
};

export default function FacturaCreate() {
  return <CreateFacturaModule config={config} />;
}
