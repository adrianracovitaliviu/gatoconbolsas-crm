import { useState, useEffect } from 'react';
import { Menu, Tabs, Button, Divider } from 'antd';
import { SettingOutlined, FileTextOutlined, CreditCardOutlined, EuroCircleOutlined } from '@ant-design/icons';
import { SettingsLayout } from '@/layout';
import Visibility from '@/components/Visibility';

import GeneralSettings from './GeneralSettings';
import PaymentSettings from './PaymentSettings';
import FacturaSettings from './FacturaSettings';
import MoneyFormatSettings from './MoneyFormatSettings';

const menuItems = [
  { key: 'generalSettings', label: 'Generales', icon: <SettingOutlined /> },
  { key: 'moneyFormatSettings', label: 'Divisas', icon: <EuroCircleOutlined /> },
  { key: 'paymentSettings', label: 'Pagos', icon: <CreditCardOutlined /> },
  { key: 'FacturaSettings', label: 'Facturación', icon: <FileTextOutlined /> },
];

const settingsArray = [
  <GeneralSettings />,
  <MoneyFormatSettings />,
  <PaymentSettings />,
  <FacturaSettings />,
];

const RightMenu = ({ activeTab, handleTabChange }) => {
  const menuList = menuItems.map((item, index) => (
    <Menu.Item key={item.key} icon={item.icon} onClick={() => handleTabChange(item.key)}>
      {item.label}
    </Menu.Item>
  ));
  return (
    <div className="pad20" style={{ width: '100%' }}>
      <Menu mode={'vertical'} selectedKeys={[activeTab]} style={{ width: '100%' }}>
        {menuList}
      </Menu>
    </div>
  );
};

const settinsBlock = ({ isActive }) =>
  settingsArray.map((setting, index) => (
    <Visibility key={menuItems[index].key + index} isVisible={isActive(menuItems[index].key)}>
      {setting}
    </Visibility>
  ));

export default function Settings() {
  const [tabKey, setTabKey] = useState(menuItems[0].key);
  const [tabTitle, setTabTitle] = useState(menuItems[0].label);

  const isActive = (tab) => {
    return tabKey === tab ? true : false;
  };

  const handleTabChange = (tab) => {
    const menuItem = menuItems.find((item) => item.key === tab);
    setTabTitle(menuItem.label);
    setTabKey(tab);
  };

  return (
    <SettingsLayout
      topCardContent={tabTitle}
      topCardTitle={'Configuración'}
      bottomCardContent={<RightMenu activeTab={tabKey} handleTabChange={handleTabChange} />}
    >
      {settinsBlock({ isActive })}
    </SettingsLayout>
  );
}
