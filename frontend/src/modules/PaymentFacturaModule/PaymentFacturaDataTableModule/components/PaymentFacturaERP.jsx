import React, { useLayoutEffect } from 'react';

import Delete from '@/modules/ErpPanelModule/DeleteItem';

import { useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';

import { useErpContext } from '@/context/erp';
import PaymentFacturaDataTable from './PaymentFacturaDataTable';

export default function PaymentFacturaERP({ config, DataTableDropMenu }) {
  const dispatch = useDispatch();
  const { state } = useErpContext();
  const { deleteModal } = state;
  useLayoutEffect(() => {
    dispatch(erp.resetState());
  }, []);

  return (
    <>
      <PaymentFacturaDataTable config={config} DataTableDropMenu={DataTableDropMenu} />
      <Delete config={config} isVisible={deleteModal.isOpen} />
    </>
  );
}
