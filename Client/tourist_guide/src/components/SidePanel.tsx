import React, { useState } from 'react';
import { Layout, Menu, Drawer, Input, Select } from 'antd';
import { SearchOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import FavoriteCard from './FavoriteCard';
import LoginModal from './LoginModal';

const { Sider } = Layout;
const { Option } = Select;

const StyledSider = styled(Sider)`
`;

const SidePanel: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');

  const favoriteCards = [
    {
      name: 'место1',
      description: 'Lorem ipsum jere. Intrabel peraktiv pávufdák láslov pide. Exon prelogí. Ngóronstanare begopp. Homoadoptíon tesánde keek sásom kottrymden. Epigen diíon fast...',
      tags: ['Музей'],
      workingHours: 'Время работы',
      visitors: 'Посетители',
      location: 'Местоположение'
    },
    {
      name: 'место2',
      description: 'Lorem ipsum jere. Intrabel peraktiv pávufdák láslov pide. Exon prelogí. Ngóronstanare begopp. Homoadoptíon tesánde keek sásom kottrymden. Epigen diíon fast...',
      tags: ['Парк'],
      workingHours: 'Время работы',
      visitors: 'Посетители',
      location: 'Местоположение'
    }
  ];

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
    console.log(`Вход с именем пользователя: ${username} и паролем: ${password}`);
    setLoginModalVisible(false);
  };

  const handleLoginModalCancel = () => {
    setLoginModalVisible(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
  };

  const filteredFavoriteCards = favoriteCards.filter((card) => {
    const searchTextMatch = card.name.toLowerCase().includes(searchText.toLowerCase());
    const filterTypeMatch = filterType === '' || card.tags.includes(filterType);
    return searchTextMatch && filterTypeMatch;
  });

  return (
    <StyledSider width={80}>
      <div style={{ padding: '16px 0', textAlign: 'center' }}>
        <img src={''} style={{ width: '32px' }} />
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
        <div style={{ marginBottom: '16px' }}>
          <Input.Group compact>
            <Input
              style={{ width: '70%' }}
              placeholder="Поиск..."
              value={searchText}
              onChange={handleSearch}
            />
            <Select
              style={{ width: '30%' }}
              value={filterType}
              onChange={handleFilterTypeChange}
            >
              <Option value="">Все</Option>
              <Option value="Музей">Музеи</Option>
              <Option value="Парк">Парки</Option>
              <Option value="Культура">Культура</Option>
            </Select>
          </Input.Group>
        </div>
        <div>
          {filteredFavoriteCards.map((card, index) => (
            <FavoriteCard
              key={index}
              title={card.name}
              description={card.description}
              tags={card.tags}
              workingHours={card.workingHours}
              visitors={card.visitors}
              location={card.location}
            />
          ))}
        </div>
      </Drawer>
      <LoginModal
        visible={loginModalVisible}
        onCancel={handleLoginModalCancel}
        onLogin={handleLogin}
        onRegister={() => console.log('Register clicked')}
      />
    </StyledSider>
  );
};

export default SidePanel;