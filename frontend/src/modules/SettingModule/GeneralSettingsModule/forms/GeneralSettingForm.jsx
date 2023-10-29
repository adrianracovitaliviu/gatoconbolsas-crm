import { useState } from 'react';
import { Form, Input, Select, Tag } from 'antd';

import { languages, tagColor } from '@/utils';

export default function GeneralSettingForm() {
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={tagColor[Math.floor(Math.random() * 11)]}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };
  return (
    <>
      <Form.Item
        label="App"
        name="app_name"
        rules={[
          {
            required: true,
            message: 'Introduzca el nombre de la app.',
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item
        label="Idioma"
        name="language"
        rules={[
          {
            required: true,
            message: 'Este campo es obligatorio.',
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Seleccione una persona"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().startsWith((optionB?.label ?? '').toLowerCase())
          }
        >
          {languages.map((language) => (
            <Select.Option
              key={language.value}
              value={language.value}
              label={language.label.toLowerCase()}
            >
              <div className="demo-option-label-item">
                <span role="img" aria-label={language.label}>
                  {language.icon}
                </span>
                {language.label}
              </div>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Rol"
        name="allowed_role"
        rules={[
          {
            required: true,
            message: 'Campo obligatorio',
          },
        ]}
      >
        <Select
          mode="tags"
          style={{
            width: '100%',
          }}
          tokenSeparators={[',']}
          tagRender={tagRender}
        ></Select>
      </Form.Item>
    </>
  );
}
