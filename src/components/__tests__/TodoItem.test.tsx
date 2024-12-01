import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';
import TodoItem from '../TodoItem';
import {Todo} from "../../types/todo.types.ts";

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: 1,
    isFavorite: false,
    attributes: {
      name: 'Test Todo',
      description: 'description',
      status: 'open',
      updatedAt: new Date().toString(),
      createdAt: new Date().toString(),
      publishedAt: new Date().toString(),
    }
  };

  const mockHandlers = {
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onFavorite: vi.fn(),
    onToggleFavorite: vi.fn()
  };

  it('renders todo item correctly', () => {
    render(
      <TodoItem
        todo={mockTodo}
        {...mockHandlers}
      />
    );

    // expect(screen.getByText('Test Todo')).toBeInTheDocument();
    // expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        {...mockHandlers}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockHandlers.onToggle).toHaveBeenCalledWith(1, true);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        {...mockHandlers}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(1);
  });

  it('calls onToggleFavorite when favorite button is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        {...mockHandlers}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /star/i }));
    expect(mockHandlers.onToggleFavorite).toHaveBeenCalledWith(1);
  });
});
