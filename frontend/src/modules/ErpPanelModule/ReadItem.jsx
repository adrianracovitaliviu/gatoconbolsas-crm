import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';

import { Button, PageHeader, Row, Col, Descriptions, Statistic, Tag } from 'antd';
import {
  EditOutlined,
  FilePdfOutlined,
  CloseCircleOutlined,
  RetweetOutlined,
  MailOutlined,
} from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import { erp } from '@/redux/erp/actions';

import { useErpContext } from '@/context/erp';
import uniqueId from '@/utils/uinqueId';

import { selectCurrentItem } from '@/redux/erp/selectors';

import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import { useMoney } from '@/settings';
import useMail from '@/hooks/useMail';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Item = ({ item }) => {
  const { moneyFormatter } = useMoney();
  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={11}>
        <p style={{ marginBottom: 5 }}>
          <strong>{item.itemName}</strong>
        </p>
        <p>{item.description}</p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: 'right',
          }}
        >
          {moneyFormatter({ amount: item.price })}
        </p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p
          style={{
            textAlign: 'right',
          }}
        >
          {item.quantity}
        </p>
      </Col>
      <Col className="gutter-row" span={5}>
        <p
          style={{
            textAlign: 'right',
            fontWeight: '700',
          }}
        >
          {moneyFormatter({ amount: item.total })}
        </p>
      </Col>
      <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
    </Row>
  );
};

export default function ReadItem({ config, selectedItem }) {
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();
  const { erpContextAction } = useErpContext();
  const { moneyFormatter } = useMoney();
  const { send } = useMail({ entity });
  const history = useHistory();

  const { result: currentResult } = useSelector(selectCurrentItem);

  const { readPanel, updatePanel } = erpContextAction;

  const resetErp = {
    status: '',
    client: {
      company: '',
      email: '',
      phone: '',
      address: '',
    },
    subTotal: 0,
    taxTotal: 0,
    taxRate: 0,
    total: 0,
    credit: 0,
    number: 0,
    recargo: 0,
    recargoTotal: 0,
    year: 0,
  };

  const [itemslist, setItemsList] = useState([]);
  const [currentErp, setCurrentErp] = useState(selectedItem ?? resetErp);

  useEffect(() => {
    const controller = new AbortController();
    if (currentResult) {
      const { items, Factura, ...others } = currentResult;

      // When it accesses the /payment/Factura/ endpoint,
      // it receives an Factura.item instead of just item
      // and breaks the code, but now we can check if items exists,
      // and if it doesn't we can access Factura.items and bring
      // out the neccessary propery alongside other properties

      if (items) {
        setItemsList(items);
        setCurrentErp(currentResult);
      } else if (Factura.items) {
        setItemsList(Factura.items);
        setCurrentErp({ ...Factura.items, ...others, ...Factura });
      }
    }
    console.log("Updated currentErp:", currentErp);
    return () => controller.abort();
    console.log("Current ERP: ", currentErp);
  }, [currentResult]);

  const invoiceNumber = currentErp.number;

  return (
    <>
      <PageHeader
        onBack={() => {
          readPanel.close();
          history.goBack();
        }}
        title={`${ENTITY_NAME} # ${currentErp.number}/${currentErp.year || ''}`}
        ghost={false}
        tags={<Tag color="volcano">{currentErp.paymentStatus || currentErp.status}</Tag>}
        // subTitle="This is cuurent erp page"
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              readPanel.close();
              history.push(`/${entity.toLowerCase()}`);
            }}
            icon={<CloseCircleOutlined />}
          >
            Cerrar
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              console.log("Downloading PDF for Invoice Number:", invoiceNumber);
              window.open(
                `${DOWNLOAD_BASE_URL}${entity}/${entity}-${invoiceNumber}.pdf`,
                '_blank'
              );
            }}
            icon={<FilePdfOutlined />}
          >
            Descargar PDF
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              send(currentErp._id);
            }}
            icon={<MailOutlined />}
          >
            Enviar por mail 
          </Button>,
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(erp.convert({ entity, id: currentErp._id }));
            }}
            icon={<RetweetOutlined />}
            style={{ display: entity === 'Albaran' ? 'inline-block' : 'none' }}
          >
            Convertir a Factura
          </Button>,

          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(
                erp.currentAction({
                  actionType: 'update',
                  data: currentErp,
                })
              );
              updatePanel.open();
              history.push(`/${entity.toLowerCase()}/update/${currentErp._id}`);
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            Editar
          </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      >
        <Row>
          <Statistic title="Estado" value={currentErp.status} />
          <Statistic
            title="Subtotal"
            value={moneyFormatter({ amount: currentErp.subTotal })}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title="Total"
            value={moneyFormatter({ amount: currentErp.total })}
            style={{
              margin: '0 32px',
            }}
          />
          <Statistic
            title="Pagado"
            value={moneyFormatter({ amount: currentErp.credit })}
            style={{
              margin: '0 32px',
            }}
          />
        </Row>
      </PageHeader>
      <Divider dashed />
      <Descriptions title={`Cliente : ${currentErp.client.company}`}>
        <Descriptions.Item label="Direccion">{currentErp.client.address}</Descriptions.Item>
        <Descriptions.Item label="Email">{currentErp.client.email}</Descriptions.Item>
        <Descriptions.Item label="Tarifa">{currentErp.client.phone}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={11}>
          <p>
            <strong>PRODUCTO</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>PRECIO</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>CANTIDAD</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={5}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            <strong>TOTAL</strong>
          </p>
        </Col>
        <Divider />
      </Row>
      {itemslist.map((item) => (
        <Item key={item.itemName} item={item}></Item>
      ))}
      <div
        style={{
          width: '300px',
          float: 'right',
          textAlign: 'right',
          fontWeight: '700',
        }}
      >
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={12}>
            <p>Subtotal :</p>
          </Col>

          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentErp.subTotal })}</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>Impuestos ({currentErp.taxRate * 100} %) :</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentErp.taxTotal })}</p>
          </Col>

          <Col className="gutter-row" span={12}>
            <p>Recargo ({currentErp.recargo / 1000}) :</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentErp.recargoTotal})}</p>
          </Col>

          <Col className="gutter-row" span={12}>
            <p>Total :</p>
          </Col>
          <Col className="gutter-row" span={12}>
            <p>{moneyFormatter({ amount: currentErp.total })}</p>
          </Col>
        </Row>
      </div>
    </>
  );
}
