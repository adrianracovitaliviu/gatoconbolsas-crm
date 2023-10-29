import { Button, Result } from 'antd';
import { ErpLayout } from '@/layout';
import ReadOfferItem from './ReadOfferItem';

import PageLoader from '@/components/PageLoader';
import { erp } from '@/redux/erp/actions';
import { selectReadItem } from '@/redux/erp/selectors';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

export default function ReadOfferModule({ config }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  useLayoutEffect(() => {
    dispatch(erp.read({ entity: config.entity, id }));
  }, [id]);

  const { result: currentResult, isSuccess, isLoading = true } = useSelector(selectReadItem);

  if (isLoading) {
    return (
      <ErpLayout>
        <PageLoader />
      </ErpLayout>
    );
  } else
    return (
      <ErpLayout>
        {isSuccess ? (
          <ReadOfferItem config={config} selectedItem={currentResult} />
        ) : (
          <Result
            status="404"
            title="Gasto no encontrado"
            subTitle="El gasto que ha solicitado no existe."
            extra={
              <Button
                type="primary"
                onClick={() => {
                  history.push(`/${config.entity.toLowerCase()}`);
                }}
              >
                Volver a Gastos
              </Button>
            }
          />
        )}
      </ErpLayout>
    );
}
