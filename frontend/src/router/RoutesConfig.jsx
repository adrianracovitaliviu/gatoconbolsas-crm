import React from 'react';
// import {
//   DesktopOutlined,
//   SettingOutlined,
//   CustomerServiceOutlined,
//   FileTextOutlined,
//   FileSyncOutlined,
//   DashboardOutlined,
//   TeamOutlined,
//   UserOutlined,
//   CreditCardOutlined,
//   BankOutlined,
// } from "@ant-design/icons";

// export const IconMenu = ({ name }) => {
//   const components = {
//     DesktopOutlined: DesktopOutlined,
//     SettingOutlined: SettingOutlined,
//     CustomerServiceOutlined: CustomerServiceOutlined,
//     FileTextOutlined: FileTextOutlined,
//     FileSyncOutlined: FileSyncOutlined,
//     DashboardOutlined: DashboardOutlined,
//     TeamOutlined: TeamOutlined,
//     UserOutlined: UserOutlined,
//     CreditCardOutlined: CreditCardOutlined,
//     BankOutlined: BankOutlined,
//     Default: DesktopOutlined,
//   };

//   const IconTag = components[name || "Default"] || SettingOutlined;
//   return <IconTag />;
// };

export const routesConfig = [
  {
    path: '/',
    component: 'Dashboard',
  },
  {
    path: '/customer',
    component: 'Customer',
  },
  {
    path: '/producto',
    component: 'Producto',
  },
  {
    path: '/factura',
    component: 'Factura/index',
  },
  {
    path: '/factura/create',
    component: 'Factura/FacturaCreate',
  },
  {
    path: '/factura/read/:id',
    component: 'Factura/FacturaRead',
  },
  {
    path: '/factura/update/:id',
    component: 'Factura/FacturaUpdate',
  },
  {
    path: '/factura/pay/:id',
    component: 'Factura/FacturaRecordPayment',
  },
  {
    path: '/Albaran',
    component: 'Albaran/index',
  },
  {
    path: '/Albaran/create',
    component: 'Albaran/AlbaranCreate',
  },
  {
    path: '/Albaran/read/:id',
    component: 'Albaran/AlbaranRead',
  },
  {
    path: '/Albaran/update/:id',
    component: 'Albaran/AlbaranUpdate',
  },
  {
    path: '/payment/Factura',
    component: 'PaymentFactura/index',
  },
  {
    path: '/payment/Factura/create',
    component: 'PaymentFactura/PaymentFacturaCreate',
  },
  {
    path: '/payment/Factura/read/:id',
    component: 'PaymentFactura/PaymentFacturaRead',
  },
  {
    path: '/payment/Factura/update/:id',
    component: 'PaymentFactura/PaymentFacturaUpdate',
  },
  {
    path: '/employee',
    component: 'Employee',
  },
  {
    path: '/admin',
    component: 'Admin',
  },
  {
    path: '/settings',
    component: 'Settings/Settings',
  },
  {
    path: '/payment/mode',
    component: 'PaymentMode',
  },
  {
    path: '/email',
    component: 'Email/index',
  },
  {
    path: '/email/read/:id',
    component: 'Email/EmailRead',
  },
  {
    path: '/email/update/:id',
    component: 'Email/EmailUpdate',
  },
  {
    path: '/settings/advanced',
    component: 'AdvancedSettings',
  },
  {
    path: '/profile',
    component: 'Profile',
  },
  {
    path: '/lead',
    component: 'Lead/index',
  },
  {
    path: '/lead/create',
    component: 'Lead/LeadCreate',
  },
  {
    path: '/lead/read/:id',
    component: 'Lead/LeadRead',
  },
  {
    path: '/lead/update/:id',
    component: 'Lead/LeadUpdate',
  },
  {
    path: '/offer',
    component: 'Offer/index',
  },
  {
    path: '/offer/create',
    component: 'Offer/OfferCreate',
  },
  {
    path: '/offer/read/:id',
    component: 'Offer/OfferRead',
  },
  {
    path: '/offer/update/:id',
    component: 'Offer/OfferUpdate',
  },
];
