import configPage from './config';
import CreateAlbaranModule from '@/modules/AlbaranModule/CreateAlbaranModule';

const customConfig = {
  /*your custom config*/
};
const config = {
  ...configPage,
  //customConfig,
};

export default function AlbaranCreate() {
  return <CreateAlbaranModule config={config} />;
}
