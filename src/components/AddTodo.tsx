import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTodoStore } from '../store/useTodoStore';

const AddTodoWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const addTodo = useTodoStore(state => state.addTodo);

  const handleSubmit = async () => {
    if (title.trim()) {
      await addTodo(title.trim());
      setTitle('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <AddTodoWrapper>
      <Input
        placeholder="Добавить новую задачу"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={handleKeyPress}
        size="large"
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleSubmit}
        size="large"
      >
        Добавить
      </Button>
    </AddTodoWrapper>
  );
};

export default AddTodo;
