import configPage from './config';
import ReadFacturaModule from '@/modules/FacturaModule/ReadFacturaModule';

export default function FacturaRead() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <ReadFacturaModule config={config} />;
}
