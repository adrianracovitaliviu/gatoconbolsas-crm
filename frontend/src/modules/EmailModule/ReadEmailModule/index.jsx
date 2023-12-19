import { Button, Result } from 'antd';
import { ErpLayout } from '@/layout';
import ReadItem from './components/ReadItem';

import PageLoader from '@/components/PageLoader';
import { erp } from '@/redux/erp/actions';
import { selectReadItem } from '@/redux/erp/selectors';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

export default function ReadEmailModule({ config }) {
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
          <ReadItem config={config} selectedItem={currentResult} />
        ) : (
          <Result
            status="404"
            title="Albaran not found"
            subTitle="Sorry, the Albaran you requested does not exist."
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
