import React, { useState } from "react";
import { Card, Tag, Divider, Row, Col, Button, Tooltip } from "antd";
import {
  ClockCircleOutlined,
  UserOutlined,
  EnvironmentOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { FavoriteCardProps } from "./FavoriteCardProps";
import {
  cardStyles,
  imageStyles,
  descriptionContainerStyles,
  descriptionContainerCollapsedStyles,
} from "./FavoriteCardStyles";

const { Meta } = Card;

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  title,
  description,
  tags,
  workingHours,
  visitors,
  location,
}) => {
  const [descVisibility, setDescVisibility] = useState(false);

  const toggleDescVisibility = () => {
    setDescVisibility((prevVisibility) => !prevVisibility);
  };

  return (
    <Card
      hoverable
      style={cardStyles}
      cover={
        <img
          alt="museum"
          src="https://via.placeholder.com/300x240"
          style={imageStyles}
        />
      }
      actions={[
        <Tooltip title="Маршрут">
          <Button
            type="primary"
            shape="circle"
            icon={<EnvironmentOutlined />}
          />
        </Tooltip>,
      ]}
    >
      <Meta
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {title}
            <Button type="text" onClick={toggleDescVisibility}>
              {descVisibility ? <DownOutlined /> : <UpOutlined />}
            </Button>
          </div>
        }
        description={
          <div
            style={{
              ...descriptionContainerStyles,
              ...(descVisibility ? descriptionContainerCollapsedStyles : {}),
            }}
          >
            {description}
          </div>
        }
      />
      <Divider style={{ margin: "12px 0" }} />
      <Row gutter={16}>
        {tags.map((tag, index) => (
          <Col key={index}>
            <Tag color="geekblue">{tag}</Tag>
          </Col>
        ))}
      </Row>
      <Divider style={{ margin: "12px 0" }} />
      <Row gutter={16}>
        <Col>
          <ClockCircleOutlined style={{ marginRight: 8 }} />
          {workingHours}
        </Col>
        <Col>
          <UserOutlined style={{ marginRight: 8 }} />
          {visitors}
        </Col>
        <Col>
          <EnvironmentOutlined style={{ marginRight: 8 }} />
          {location}
        </Col>
      </Row>
    </Card>
  );
};

export default FavoriteCard;
