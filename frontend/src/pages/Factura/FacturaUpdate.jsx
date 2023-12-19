import configPage from './config';
import UpdateFacturaModule from '@/modules/FacturaModule/UpdateFacturaModule';

export default function FacturaUpdate() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <UpdateFacturaModule config={config} />;
}
