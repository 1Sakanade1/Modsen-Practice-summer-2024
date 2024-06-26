import React, { useState } from 'react';
import { Layout, Menu, Drawer } from 'antd';
import { SearchOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { LOGO_PATH, RANDOM_IMAGE } from '../routes';
import FavoriteCard from './FavoriteCard';
import LoginModal from './LoginModal';

const { Sider } = Layout;

const StyledSider = styled(Sider)`
`;

const SidePanel: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const showLoginModal = () => {
    setLoginModalVisible(true);
  };

  const handleLogin = (username: string, password: string) => {
    // Логика входа
    console.log(`Вход с именем пользователя: ${username} и паролем: ${password}`);
    setLoginModalVisible(false);
  };

  const handleLoginModalCancel = () => {
    setLoginModalVisible(false);
  };

  return (
    <StyledSider width={80}>
      <div style={{ padding: '16px 0', textAlign: 'center' }}>
        <img src={RANDOM_IMAGE} style={{ width: '32px' }} />
      </div>
      <Menu mode="inline" style={{ border: 'none' }}>
        <Menu.Item key="search" icon={<SearchOutlined />} />
        <Menu.Item key="bookmarks" icon={<BookOutlined />} onClick={showDrawer} />
        <Menu.Item key="profile" icon={<UserOutlined />} onClick={showLoginModal} />
      </Menu>
      <Drawer
        title="Избранное"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={320}
      >
        <div>
        <FavoriteCard
          title="название места"
          description="Lorem ipsum jere. Intrabel peraktiv pávufdák láslov pide. Exon prelogí. Ngóronstanare begopp. Homoadoptíon tesánde keek sásom kottrymden. Epigen diíon fast..."
          tags={['Музей']}
          workingHours="Время работы"
          visitors="Посетители"
          location="Местоположение"
        />
        <FavoriteCard
          title="название места"
          description="Lorem ipsum jere. Intrabel peraktiv pávufdák láslov pide. Exon prelogí. Ngóronstanare begopp. Homoadoptíon tesánde keek sásom kottrymden. Epigen diíon fast..."
          tags={['Парк']}
          workingHours="Время работы"
          visitors="Посетители"
          location="Местоположение"
        />
        </div>
      </Drawer>
      <LoginModal
        visible={loginModalVisible}
        onCancel={handleLoginModalCancel}
        onLogin={handleLogin}
      />
    </StyledSider>
  );
};

export default SidePanel;