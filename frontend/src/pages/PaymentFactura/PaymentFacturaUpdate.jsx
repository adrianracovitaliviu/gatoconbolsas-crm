import configPage from './config';
import UpdatePaymentFacturaModule from '@/modules/PaymentFacturaModule/UpdatePaymentFacturaModule';

export default function PaymentFacturaUpdate() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <UpdatePaymentFacturaModule config={config} />;
}
