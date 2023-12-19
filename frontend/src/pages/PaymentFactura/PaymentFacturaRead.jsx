import configPage from './config';
import ReadPaymentFacturaModule from '@/modules/PaymentFacturaModule/ReadPaymentFacturaModule';

export default function PaymentFacturaRead() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <ReadPaymentFacturaModule config={config} />;
}
