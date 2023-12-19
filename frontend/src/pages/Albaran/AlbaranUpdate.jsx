import configPage from './config';
import UpdateAlbaranModule from '@/modules/AlbaranModule/UpdateAlbaranModule';

export default function AlbaranUpdate() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <UpdateAlbaranModule config={config} />;
}
