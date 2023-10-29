import React from 'react';
import ProfileModule from '@/modules/ProfileModule';

export default function Profile() {
  const entity = 'profile';

  const PANEL_TITLE = 'perfil';
  const ENTITY_NAME = 'Perfil';
  const UPDATE_ENTITY = 'Actualizar perfil';

  const config = {
    entity,
    PANEL_TITLE,
    ENTITY_NAME,
    UPDATE_ENTITY,
  };
  return <ProfileModule config={config} />;
}
