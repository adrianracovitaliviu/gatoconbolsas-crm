import React, { useState, useEffect } from 'react';
import { Form, Divider, Button, PageHeader, Tag } from 'antd';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectUpdatedItem } from '@/redux/erp/selectors';

import { useErpContext } from '@/context/erp';

import Loading from '@/components/Loading';

import calculate from '@/utils/calculate';
import PaymentFacturaForm from '../../Forms/PaymentFacturaForm';
export default function UpdatePayment({ config, currentFactura }) {
  let { entity } = config;
  const dispatch = useDispatch();

  const { isLoading, isSuccess } = useSelector(selectUpdatedItem);

  const [form] = Form.useForm();

  const [maxAmount, setMaxAmount] = useState(0);

  useEffect(() => {
    if (currentFactura) {
      const { credit, total, discount, amount } = currentFactura;

      setMaxAmount(
        calculate.sub(calculate.sub(total, discount), calculate.sub(calculate.sub(credit, amount)))
      );
      if (currentFactura.date) {
        currentFactura.date = dayjs(currentFactura.date);
      }
      form.setFieldsValue(currentFactura);
    }
  }, [currentFactura]);

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'recordPayment' }));
      dispatch(erp.list({ entity }));
    }
  }, [isSuccess]);

  const onSubmit = (fieldsValue) => {
    if (currentFactura) {
      const { _id: Factura } = currentFactura;
      const client = currentFactura.client && currentFactura.client._id;
      fieldsValue = {
        ...fieldsValue,
        Factura,
        client,
      };
    }

    dispatch(
      erp.update({
        entity,
        id: currentFactura._id,
        jsonData: fieldsValue,
      })
    );
  };

  return (
    <>
      <Loading isLoading={isLoading}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <PaymentFacturaForm maxAmount={maxAmount} />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Actualizar pago
            </Button>
          </Form.Item>
        </Form>
      </Loading>
    </>
  );
}
