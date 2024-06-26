import React, { useState } from 'react';
import { Modal, Form, Input, Button, Typography } from 'antd';

const { Text } = Typography;

interface LoginModalProps {
  visible: boolean;
  onCancel: () => void;
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible, onCancel, onLogin, onRegister }) => {
  const [form] = Form.useForm();
  const [isRegistrationMode, setIsRegistrationMode] = useState(false);

  const handleLogin = () => {
    form.validateFields().then((values) => {
      onLogin(values.username, values.password);
      form.resetFields();
    });
  };

  const handleRegister = () => {
    form.validateFields().then((values) => {
      onRegister(values.username, values.password);
      form.resetFields();
    });
  };

  const toggleRegistrationMode = () => {
    setIsRegistrationMode(!isRegistrationMode);
  };

  return (
    <Modal
      title={isRegistrationMode ? 'Регистрация' : 'Войти'}
      visible={visible}
      onCancel={onCancel}
      width={380}
      footer={[
        <div key="footer-left" style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Text
            key="toggle-mode"
            style={{ marginRight: 'auto', textDecoration: 'underline', cursor: 'pointer' }}
            onClick={toggleRegistrationMode}
          >
            {isRegistrationMode ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
          </Text>
        </div>,
        <div key="footer-right" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button key="cancel" onClick={onCancel}>
            Отмена
          </Button>
          {isRegistrationMode ? (
            <Button key="register" type="primary" onClick={handleRegister}>
              Зарегистрироваться
            </Button>
          ) : (
            <Button key="login" type="primary" onClick={handleLogin}>
              Войти
            </Button>
          )}
        </div>,
      ]}
    >
      <Form form={form} layout="vertical" style={{ marginTop: '16px' }}>
        <Form.Item
          name="username"
          label="Имя пользователя"
          rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label={isRegistrationMode ? 'Пароль' : 'Пароль'}
          rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
          style={{ marginTop: '-20px', paddingBottom: '10px' }}
        >
          <Input.Password />
        </Form.Item>
        {isRegistrationMode && (
          <Form.Item
            name="confirmPassword"
            label="Подтвердите пароль"
            rules={[
              { required: true, message: 'Пожалуйста, подтвердите пароль' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}
            style={{ marginTop: '-20px', paddingBottom: '10px' }}
          >
            <Input.Password />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default LoginModal;