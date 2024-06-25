import React, { useState } from 'react';
import { Card, Tag, Divider, Row, Col, Button, Tooltip } from 'antd';
import { ClockCircleOutlined, UserOutlined, EnvironmentOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';

const { Meta } = Card;

interface FavoriteCardProps {
  title: string;
  description: string;
  tags: string[];
  workingHours: string;
  visitors: string;
  location: string;
}

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
    setDescVisibility(!descVisibility);
  };

  return (
    <Card
      hoverable
      style={{
        width: 280,
        borderRadius: 16,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      }}
      cover={
        <img
          alt="museum"
          src="https://via.placeholder.com/300x240"
          style={{
            height: 240,
            objectFit: 'cover',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
      }
      actions={[
        <Tooltip title="Маршрут">
          <Button type="primary" shape="circle" icon={<EnvironmentOutlined />} />
        </Tooltip>
      ]}
    >
      <Meta
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {title}
            <Button type="text" onClick={toggleDescVisibility}>
              {descVisibility ? <DownOutlined /> : <UpOutlined />}
            </Button>
          </div>
        }
        description={
          <div
            style={{
              maxHeight: descVisibility ? '1000px' : '50px',
              overflow: 'hidden',
              transition: 'max-height 0.15s ease-out',
            }}
          > 
            {description}
          </div>
        }
      />
      <Divider style={{ margin: '12px 0' }} />
      <Row gutter={16}>
        {tags.map((tag, index) => (
          <Col key={index}>
            <Tag color="geekblue">{tag}</Tag>
          </Col>
        ))}
      </Row>
      <Divider style={{ margin: '12px 0' }} />
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