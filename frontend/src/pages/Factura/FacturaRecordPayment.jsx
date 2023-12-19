import configPage from './config';
import RecordPaymentFacturaModule from '@/modules/FacturaModule/RecordPaymentFacturaModule';

export default function FacturaRecord() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <RecordPaymentFacturaModule config={config} />;
}
