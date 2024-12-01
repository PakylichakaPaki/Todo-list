import React, {useState} from 'react';
import styled from 'styled-components';
import {Button, Checkbox, Modal, Tag, Typography} from 'antd';
import {DeleteOutlined, StarOutlined} from '@ant-design/icons';
import {Status, Todo} from '../types/todo.types';

const { Text, Paragraph } = Typography;

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onFavorite?: (id: number) => void;
  onToggleFavorite?: (id: number) => void;
}

interface TodoTextProps {
  status: Status;
}

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #fafafa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const TodoText = styled.span<TodoTextProps>`
  margin-left: 12px;
  flex: 1;
  text-decoration: ${props => props.status === 'done' ? 'line-through' : 'none'};
  color: ${props => props.status === 'done' ? '#999' : '#000'};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const TodoDetails = styled.div`
  margin-top: 16px;
  
  .ant-typography {
    margin-bottom: 8px;
  }
`;

const getStatusColor = (status: Status) => {
  switch (status) {
    case 'done':
      return 'success';
    case 'working':
      return 'processing';
    case 'open':
      return 'default';
    default:
      return 'default';
  }
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onFavorite }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id, attributes, isFavorite } = todo;
  const { name, status, description, createdAt, updatedAt } = attributes;

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Не открываем модальное окно при клике на кнопки или чекбокс
    if (!target.closest('button') && !target.closest('.ant-checkbox')) {
      setIsModalVisible(true);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <>
      <TodoItemWrapper onClick={handleClick}>
        <Checkbox
          checked={status === 'done'}
          onChange={() => onToggle(id)}
        />
        <TodoText status={status}>
          {name}
        </TodoText>
        <ActionButtons>
          <Button
            type="text"
            icon={<StarOutlined style={{ color: isFavorite ? '#fadb14' : undefined }} />}
            onClick={() => onFavorite?.(id)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(id)}
            danger
          />
        </ActionButtons>
      </TodoItemWrapper>

      <Modal
        title={<Text strong>{name}</Text>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <TodoDetails>
          <Paragraph>
            <Text strong>Статус: </Text>
            <Tag color={getStatusColor(status)}>
              {status?.toUpperCase()}
            </Tag>
          </Paragraph>

          {description && (
            <Paragraph>
              <Text strong>Описание: </Text>
              <br />
              {description}
            </Paragraph>
          )}

          <Paragraph>
            <Text strong>Создано: </Text>
            {formatDate(createdAt)}
          </Paragraph>

          <Paragraph>
            <Text strong>Обновлено: </Text>
            {formatDate(updatedAt)}
          </Paragraph>

          {isFavorite && (
            <Paragraph>
              <Tag color="warning">В избранном</Tag>
            </Paragraph>
          )}
        </TodoDetails>
      </Modal>
    </>
  );
};

export default TodoItem;
