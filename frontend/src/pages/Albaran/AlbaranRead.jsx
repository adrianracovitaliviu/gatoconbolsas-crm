import configPage from './config';
import ReadAlbaranModule from '@/modules/AlbaranModule/ReadAlbaranModule';

export default function AlbaranRead() {
  const customConfig = {
    /*your custom config*/
  };
  const config = {
    ...configPage,
    //customConfig,
  };
  return <ReadAlbaranModule config={config} />;
}
