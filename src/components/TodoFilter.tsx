import React from 'react';
import styled from 'styled-components';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { TodoFilter as FilterType } from '../types/todo.types';
import { useTodoStore } from '../store/useTodoStore';

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  padding: 0 20px;
`;

const TodoFilter: React.FC = () => {
  const { filter, setFilter } = useTodoStore();

  const handleFilterChange = (e: RadioChangeEvent) => {
    setFilter(e.target.value as FilterType);
  };

  return (
    <FilterWrapper>
      <Radio.Group value={filter} onChange={handleFilterChange} size="large">
        <Radio.Button value="all">Все</Radio.Button>
        <Radio.Button value="active">Активные</Radio.Button>
        <Radio.Button value="completed">Выполненные</Radio.Button>
        <Radio.Button value="favorite">Избранные</Radio.Button>
      </Radio.Group>
    </FilterWrapper>
  );
};

export default TodoFilter;
