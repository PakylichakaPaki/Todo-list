import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTodoStore } from '../store/useTodoStore';

const SearchWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto 20px;
  padding: 0 20px;
`;

const TodoSearch: React.FC = () => {
  const setSearchText = useTodoStore(state => state.setSearchText);

  return (
    <SearchWrapper>
      <Input
        placeholder="Поиск задач..."
        prefix={<SearchOutlined />}
        allowClear
        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        size="large"
      />
    </SearchWrapper>
  );
};

export default TodoSearch;
