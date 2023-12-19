import { notification } from 'antd';
import history from '@/utils/history';
import codeMessage from './codeMessage';

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const message = response.data && response.data.message;

    const errorText = message || codeMessage[response.status];
    const { status } = response;
    notification.config({
      duration: 10,
    });
    notification.error({
      message: `Request error ${status}`,
      description: errorText,
    });
    if (response.data && response.data.jwtExpired) {
      history.push('/logout');
    }
    return response.data;
  } else {
    notification.config({
      duration: 5,
    });
    notification.error({
      message: 'Sin conexión a internet.',
      description: 'No ha sido posible conectarse al servidor, revise su conexión.',
    });
    return {
      success: false,
      result: null,
      message: 'No ha sido posible conectarse al servidor, revise su conexión.',
    };
  }
};

export default errorHandler;
