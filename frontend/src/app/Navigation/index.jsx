import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Drawer, Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';
import logoIcon from '@/style/images/logo-transparente-solo-gato.png';
import logoText from '@/style/images/logo-text.png';
import history from '@/utils/history';

import {
  SettingOutlined,
  FileTextOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CreditCardOutlined,
  MenuOutlined,
  ShopOutlined,
  FileOutlined,
  GroupOutlined,
  ShoppingCartOutlined,
  
} from '@ant-design/icons';

const SIDEBAR_MENU = [
  { key: '/', icon: <DashboardOutlined />, title: 'Resumen' },
  { key: '/lead', icon: <ShopOutlined />, title: 'Proveedores' },
  { key: '/offer', icon: <FileOutlined />, title: 'Gastos' },
  { key: '/producto', icon: <ShoppingCartOutlined />, title: 'Productos' },
  { key: '/customer', icon: <GroupOutlined />, title: 'Clientes' },
  { key: '/Factura', icon: <FileTextOutlined />, title: 'Facturación' },
  { key: '/Albaran', icon: <FileSyncOutlined />, title: 'Albaranes' },
  { key: '/payment/Factura', icon: <CreditCardOutlined />, title: 'Pagos' },
  { key: '/employee', icon: <UserOutlined />, title: 'Empleados' },
  { key: '/admin', icon: <TeamOutlined />, title: 'Administradores' },
];

const SETTINGS_SUBMENU = [
  { key: '/settings', title: 'General' },

  { key: '/email', title: 'Plantillas de correo' },

  { key: '/payment/mode', title: 'Métodos de pago' },
  { key: '/settings/advanced', title: 'Avanzada' },
];

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Navigation() {
  return (
    <>
      <div className="sidebar-wraper">
        <Sidebar collapsible={true} />
      </div>
      <MobileSidebar />
    </>
  );
}

function Sidebar({ collapsible }) {
  let location = useLocation();

  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    if (location) if (currentPath !== location.pathname) setCurrentPath(location.pathname);
  }, [location, currentPath]);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <>
      <Sider
        collapsible={collapsible}
        collapsed={collapsible ? isNavMenuClose : collapsible}
        onCollapse={onCollapse}
        className="navigation"
      >
        <div className="logo" onClick={() => history.push('/')} style={{ cursor: 'pointer' }}>
          <img src={logoIcon} alt="Logo" style={{ 
            height: '50px',
            marginLeft: '-5px'
            }} />

          {!showLogoApp && (
            <img
              src={logoText}
              alt="Logo"
              style={{ marginTop: '0px', marginLeft: '7px', height: '36px' }}
            />

          )}
        </div>
        <Menu mode="inline" selectedKeys={[currentPath]}>
          {SIDEBAR_MENU.map((menuItem) => (
            <Menu.Item key={menuItem.key} icon={menuItem.icon}>
              <Link to={menuItem.key} />
              {menuItem.title}
            </Menu.Item>
          ))}
          <SubMenu key={'Settings'} icon={<SettingOutlined />} title={'Ajustes'}>
            {SETTINGS_SUBMENU.map((menuItem) => (
              <Menu.Item key={menuItem.key}>
                <Link to={menuItem.key} />
                {menuItem.title}
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </Sider>
    </>
  );
}

function MobileSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Button type="text" size="large" onClick={showDrawer} className="mobile-sidebar-btn">
        <MenuOutlined />
      </Button>
      <Drawer
        width={200}
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        className="mobile-sidebar-wraper"
      >
        <Sidebar collapsible={false} />
      </Drawer>
    </>
  );
}
