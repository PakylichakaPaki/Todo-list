import { create } from 'zustand';
import axios from 'axios';
import { Todo, TodoFilter, TodoResponse } from '../types/todo.types';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  filter: TodoFilter;
  page: number;
  hasMore: boolean;
  error: string | null;
  favorites: number[];
  searchText: string;
  
  fetchTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  setFilter: (filter: TodoFilter) => void;
  toggleFavorite: (id: number) => void;
  setSearchText: (text: string) => void;
}

const API_URL = 'https://cms.laurence.host/api';

// Получаем сохраненные избранные задачи из localStorage
const getFavoritesFromStorage = (): number[] => {
  const stored = localStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
};

// Сохраняем избранные задачи в localStorage
const saveFavoritesToStorage = (favorites: number[]) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  loading: false,
  filter: 'all',
  page: 1,
  hasMore: true,
  error: null,
  favorites: getFavoritesFromStorage(),
  searchText: '',

  fetchTodos: async () => {
    try {
      set({ loading: true });
      const response = await axios.get<TodoResponse>(`${API_URL}/tasks`);
      console.log('Raw API Response:', JSON.stringify(response.data, null, 2));

      const todos = response.data.data.map(item => ({
        id: item.id,
        attributes: {
          name: item.attributes.name || '',
          description: item.attributes.description || '',
          status: item.attributes.status || 'open',
          createdAt: item.attributes.createdAt,
          updatedAt: item.attributes.updatedAt,
          publishedAt: item.attributes.publishedAt
        },
        isFavorite: get().favorites.includes(item.id)
      })).filter(todo => todo.attributes.name !== null);

      console.log('Processed todos:', JSON.stringify(todos, null, 2));
      set({ todos, loading: false, error: null });
    } catch (error) {
      console.error('Error fetching todos:', error);
      set({ error: 'Failed to fetch todos', loading: false });
    }
  },

  addTodo: async (title: string) => {
    try {
      set({ loading: true });
      const newTodoData = {
        data: {
          name: title,
          description: '',
          status: 'open'
        }
      };
      
      console.log('Sending new todo:', JSON.stringify(newTodoData, null, 2));
      const response = await axios.post(`${API_URL}/tasks`, newTodoData);
      console.log('Server response:', JSON.stringify(response.data, null, 2));

      if (!response.data?.data) {
        throw new Error('Invalid server response');
      }

      const newTodo: Todo = {
        id: response.data.data.id,
        attributes: {
          name: response.data.data.attributes.name || title,
          description: response.data.data.attributes.description || '',
          status: response.data.data.attributes.status || 'open',
          createdAt: response.data.data.attributes.createdAt,
          updatedAt: response.data.data.attributes.updatedAt,
          publishedAt: response.data.data.attributes.publishedAt
        },
        isFavorite: false
      };

      set(state => ({
        todos: [newTodo, ...state.todos],
        loading: false,
        error: null
      }));
    } catch (error) {
      console.error('Error adding todo:', error);
      set({ error: 'Failed to add todo', loading: false });
    }
  },

  toggleTodo: async (id: number) => {
    try {
      const state = get();
      const todo = state.todos.find(t => t.id === id);
      if (!todo) return;

      const newStatus = todo.attributes.status === 'done' ? 'open' : 'done';
      
      // Optimistic update
      set(state => ({
        todos: state.todos.map(t =>
          t.id === id
            ? { ...t, attributes: { ...t.attributes, status: newStatus } }
            : t
        )
      }));

      await axios.put(`${API_URL}/tasks/${id}`, {
        data: {
          status: newStatus
        }
      });
    } catch (error) {
      console.error('Error toggling todo:', error);
      // Revert on error
      get().fetchTodos();
      set({ error: 'Failed to update todo' });
    }
  },

  deleteTodo: async (id: number) => {
    try {
      // Сначала обновляем UI оптимистично
      set(state => ({
        todos: state.todos.filter(todo => todo.id !== id)
      }));

      // Затем отправляем запрос на сервер
      await axios.delete(`${API_URL}/tasks/${id}`);
    } catch (error) {
      console.error('Error deleting todo:', error);
      // В случае ошибки возвращаем удаленную задачу обратно
      const deletedTodo = get().todos.find(todo => todo.id === id);
      if (deletedTodo) {
        set(state => ({
          todos: [...state.todos, deletedTodo],
          error: 'Ошибка при удалении задачи'
        }));
      }
    }
  },

  setFilter: (filter: TodoFilter) => {
    set({ filter });
  },

  toggleFavorite: (id: number) => {
    set(state => {
      const newFavorites = state.favorites.includes(id)
        ? state.favorites.filter(favId => favId !== id)
        : [...state.favorites, id];
      
      // Сохраняем в localStorage
      saveFavoritesToStorage(newFavorites);
      
      // Обновляем состояние todos
      const newTodos = state.todos.map(todo =>
        todo.id === id ? { ...todo, isFavorite: !todo.isFavorite } : todo
      );

      return {
        favorites: newFavorites,
        todos: newTodos
      };
    });
  },

  setSearchText: (text: string) => {
    set({ searchText: text });
  }
}));
