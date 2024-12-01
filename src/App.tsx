import React from 'react';
import { ConfigProvider, Layout, Typography } from 'antd';
import styled from 'styled-components';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import TodoFilter from './components/TodoFilter';
import TodoSearch from './components/TodoSearch';

const { Header, Content } = Layout;
const { Title } = Typography;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  background: #fff;
  text-align: center;
  padding: 20px;
  height: auto;
`;

const StyledContent = styled(Content)`
  padding: 0 50px;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <StyledLayout>
        <StyledHeader>
          <Title level={2}>Todo List</Title>
        </StyledHeader>
        <StyledContent>
          <AddTodo />
          <TodoSearch />
          <TodoFilter />
          <TodoList />
        </StyledContent>
      </StyledLayout>
    </ConfigProvider>
  );
};

export default App;
