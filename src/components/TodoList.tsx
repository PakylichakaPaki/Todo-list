import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Spin, Empty } from 'antd';
import TodoItem from './TodoItem';
import { useTodoStore } from '../store/useTodoStore';

const TodoListWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const LoadingWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const TodoList: React.FC = () => {
  const {
    todos,
    loading,
    filter,
    searchText,
    fetchTodos,
    toggleTodo,
    deleteTodo,
    toggleFavorite
  } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    // Сначала фильтруем по поисковому запросу
    const matchesSearch = searchText
      ? todo.attributes.name.toLowerCase().includes(searchText) ||
        (todo.attributes.description?.toLowerCase()?.includes(searchText) ?? false)
      : true;

    if (!matchesSearch) return false;

    // Затем применяем фильтр по статусу
    switch (filter) {
      case 'completed':
        return todo.attributes.status === 'done';
      case 'active':
        return todo.attributes.status === 'open';
      case 'favorite':
        return todo.isFavorite;
      default:
        return true;
    }
  });

  if (loading && todos.length === 0) {
    return (
      <LoadingWrapper>
        <Spin size="large" />
      </LoadingWrapper>
    );
  }

  return (
    <TodoListWrapper>
      {filteredTodos.length === 0 ? (
        <Empty 
          description={searchText ? "Ничего не найдено" : "Нет задач"} 
          style={{ padding: '20px' }}
        />
      ) : (
        filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onFavorite={toggleFavorite}
          />
        ))
      )}
    </TodoListWrapper>
  );
};

export default TodoList;
