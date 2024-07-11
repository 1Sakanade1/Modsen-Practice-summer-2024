import React, { useState } from "react";
import { message } from "antd";
import { Modal, Form, Input, Button, Typography } from "antd";
import { LoginModalProps } from "./LoginModalProps";
import "./LoginModal.css";
import middleware from "../../middleware/middleware.ts";

const { Text } = Typography;

const LoginModal: React.FC<LoginModalProps> = ({
  visible,
  onCancel,
  onLogin,
  onRegister,
}) => {
  const [form] = Form.useForm();
  const [isRegistrationMode, setIsRegistrationMode] = useState(false);

  const handleLogin = () => {
    form.validateFields().then((values) => {
      onLogin(values.email, values.password);
      middleware.loginUser({
        email: values.email,
        password: values.password,
      });
      form.resetFields();
      message.success("вы успешно вошли в аккаунт");
    });
  };

  const handleRegister = () => {
    form.validateFields().then((values) => {
      console.log("zxc" + values.email + values.password);
      onRegister(values.email, values.password);
      middleware.registerUser({
        email: values.email,
        password: values.password,
      });
      form.resetFields();
      message.success("успешная регистрация, войдите в аккаунт");
    });
  };

  const toggleRegistrationMode = () => {
    setIsRegistrationMode(!isRegistrationMode);
  };

  return (
    <Modal
      title={isRegistrationMode ? "Регистрация" : "Войти"}
      visible={visible}
      onCancel={onCancel}
      width={380}
      footer={[
        <div key="footer-left" className="footer-left">
          <Text
            key="toggle-mode"
            className="toggle-mode"
            onClick={toggleRegistrationMode}
          >
            {isRegistrationMode ? "Уже есть аккаунт?" : "Нет аккаунта?"}
          </Text>
        </div>,
        <div key="footer-right" className="footer-right">
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
      <Form form={form} layout="vertical" className="form-container">
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Пожалуйста, введите email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label={isRegistrationMode ? "Пароль" : "Пароль"}
          rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}
          className="password-item"
        >
          <Input.Password />
        </Form.Item>
        {isRegistrationMode && (
          <Form.Item
            name="confirmPassword"
            label="Подтвердите пароль"
            rules={[
              { required: true, message: "Пожалуйста, подтвердите пароль" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Пароли не совпадают"));
                },
              }),
            ]}
            className="password-item"
          >
            <Input.Password />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default LoginModal;
