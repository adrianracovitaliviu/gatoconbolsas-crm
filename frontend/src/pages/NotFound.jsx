import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import history from '@/utils/history';
const NotFound = () => {
  useEffect(() => {
    history.replace('/notfound');
  }, []);
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="La página que buscas no existe."
        extra={
          <Button href="/" type="primary">
            Volver a inicio
          </Button>
        }
      />
    </>
  );
};
export default NotFound;
