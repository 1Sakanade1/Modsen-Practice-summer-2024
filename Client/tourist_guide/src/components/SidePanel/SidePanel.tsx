import React, { useState, useEffect } from "react";
import { message } from "antd";
import { Layout, Menu, Drawer, Input, Select } from "antd";
import {
  SearchOutlined,
  BookOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import LoginModal from "../LoginModal/LoginModal";

const { Sider } = Layout;
const { Option } = Select;

const StyledSider = styled(Sider)``;

const SidePanel: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoginModalVisible, setisLoginModalVisible] =
    useState<boolean>(false);
  const [searchModalVisible, setSearchModalVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setIsLoggedIn(!!jwt);
  }, []);

  const favoriteCards = [
    {
      name: "место1",
      description:
        "Lorem ipsum jere. Intrabel peraktiv pávufdák láslov pide. Exon prelogí. Ngóronstanare begopp. Homoadoptíon tesánde keek sásom kottrymden. Epigen diíon fast...",
      tags: ["Музей"],
      workingHours: "Время работы",
      visitors: "Посетители",
      location: "Местоположение",
    },
    {
      name: "место2",
      description:
        "Lorem ipsum jere. Intrabel peraktiv pávufdák láslov pide. Exon prelogí. Ngóronstanare begopp. Homoadoptíon tesánde keek sásom kottrymden. Epigen diíon fast...",
      tags: ["Парк"],
      workingHours: "Время работы",
      visitors: "Посетители",
      location: "Местоположение",
    },
  ];

  const showDrawer = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) setVisible(true);
    else message.error("вы должны быть авторизованы!");
  };

  const onClose = () => {
    setVisible(false);
  };

  const showLoginModal = () => {
    setisLoginModalVisible(true);
  };

  const handleLogin = (username: string, password: string) => {
    console.log(
      `Вход с именем пользователя: ${username} и паролем: ${password}`
    );
    setIsLoggedIn(true);
    setisLoginModalVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };
  const handleRegister = () => {};

  const handleLoginModalCancel = () => {
    setisLoginModalVisible(false);
  };

  const showSearchModal = () => {
    setSearchModalVisible(true);
  };

  const handleSearchModalCancel = () => {
    setSearchModalVisible(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleFilterTypeChange = (value: string) => {
    setFilterType(value);
  };

  const filteredFavoriteCards = favoriteCards.filter((card) => {
    const searchTextMatch = card.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const filterTypeMatch = filterType === "" || card.tags.includes(filterType);
    return searchTextMatch && filterTypeMatch;
  });

  return (
    <StyledSider width={80}>
      <div style={{ padding: "16px 0", textAlign: "center" }}>
        <img src={""} style={{ width: "32px" }} />
      </div>
      <Menu mode="inline" style={{ border: "none" }}>
        <Menu.Item
          key="search"
          icon={<SearchOutlined />}
          onClick={showSearchModal}
        />
        <Menu.Item
          key="bookmarks"
          icon={<BookOutlined />}
          onClick={showDrawer}
        />
        <Menu.Item
          key="profile"
          icon={isLoggedIn ? <LogoutOutlined /> : <UserOutlined />}
          onClick={isLoggedIn ? handleLogout : showLoginModal}
        />
      </Menu>
      <Drawer
        title="Избранное"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={320}
      >
        <div style={{ marginBottom: "16px" }}>
          <Input.Group compact>
            <Input
              style={{ width: "70%" }}
              placeholder="Поиск..."
              value={searchText}
              onChange={handleSearch}
            />
            <Select
              style={{ width: "30%" }}
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
        visible={isLoginModalVisible}
        onCancel={handleLoginModalCancel}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      <Drawer
        title="Поиск"
        placement="right"
        onClose={handleSearchModalCancel}
        visible={searchModalVisible}
        width={320}
      >
        <Input.Group compact>
          <Input
            style={{ width: "70%" }}
            placeholder="Поиск..."
            value={searchText}
            onChange={handleSearch}
          />
          <Select
            style={{ width: "30%" }}
            value={filterType}
            onChange={handleFilterTypeChange}
          >
            <Option value="">Все</Option>
            <Option value="Музей">Музеи</Option>
            <Option value="Парк">Парки</Option>
            <Option value="Культура">Культура</Option>
          </Select>
        </Input.Group>
      </Drawer>
    </StyledSider>
  );
};

export default SidePanel;
