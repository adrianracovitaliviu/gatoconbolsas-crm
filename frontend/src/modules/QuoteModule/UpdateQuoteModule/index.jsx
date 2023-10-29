import { Button, Result } from 'antd';

import { ErpLayout } from '@/layout';
import UpdateItem from '@/modules/ErpPanelModule/UpdateItem';
import QuoteForm from '@/modules/QuoteModule/Forms/QuoteForm';

import PageLoader from '@/components/PageLoader';

import { erp } from '@/redux/erp/actions';
import { selectReadItem } from '@/redux/erp/selectors';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

export default function UpdateQuoteModule({ config }) {
  const dispatch = useDispatch();

  const { id } = useParams();
  const history = useHistory();

  useLayoutEffect(() => {
    dispatch(erp.read({ entity: config.entity, id }));
  }, [id]);

  const { result: currentResult, isSuccess, isLoading = true } = useSelector(selectReadItem);

  useLayoutEffect(() => {
    if (currentResult) {
      dispatch(erp.currentAction({ actionType: 'update', data: currentResult }));
    }
  }, [currentResult]);

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
          <UpdateItem config={config} UpdateForm={QuoteForm} />
        ) : (
          <Result
            status="404"
            title="Albarán no encontrado"
            subTitle="El albarán que busca no existe."
            extra={
              <Button
                type="primary"
                onClick={() => {
                  history.push(`/${config.entity.toLowerCase()}`);
                }}
              >
                Volver a Albaranes
              </Button>
            }
          />
        )}
      </ErpLayout>
    );
}
