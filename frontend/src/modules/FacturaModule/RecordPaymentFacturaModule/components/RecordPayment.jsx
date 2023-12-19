import React, { useState, useEffect } from 'react';
import { Form, Divider, Button, PageHeader, Tag } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';
import { selectCurrentItem, selectRecordPaymentItem } from '@/redux/erp/selectors';

import { useErpContext } from '@/context/erp';

import Loading from '@/components/Loading';

import PaymentFacturaForm from '@/forms/PaymentFacturaForm';

import calculate from '@/utils/calculate';

export default function RecordPayment({ config }) {
  let { entity } = config;
  const { erpContextAction } = useErpContext();
  const { recordPanel } = erpContextAction;
  const dispatch = useDispatch();

  const { isLoading, isSuccess, current: currentFactura } = useSelector(selectRecordPaymentItem);

  const [form] = Form.useForm();

  const [maxAmount, setMaxAmount] = useState(0);
  useEffect(() => {
    if (currentFactura) {
      const { credit, total, discount } = currentFactura;

      setMaxAmount(calculate.sub(calculate.sub(total, discount), credit));
    }
  }, [currentFactura]);
  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      dispatch(erp.resetAction({ actionType: 'recordPayment' }));
      recordPanel.close();
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
      erp.recordPayment({
        entity: 'payment/Factura',
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
              Registrar pago
            </Button>
          </Form.Item>
        </Form>
      </Loading>
    </>
  );
}
