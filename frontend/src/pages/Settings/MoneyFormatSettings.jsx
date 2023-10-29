import configPage from './config';

import MoneyFormatSettingsModule from '@/modules/SettingModule/MoneyFormatSettingsModule';

const config = {
  ...configPage,
  settingsCategory: 'money_format_settings',
  SETTINGS_TITLE: 'Divisas',
};
export default function MoneyFormatSettings() {
  return <MoneyFormatSettingsModule config={config} />;
}
