import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoItem from '../TodoItem';

describe('TodoItem', () => {
  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    completed: false,
    isFavorite: false
  };

  const mockHandlers = {
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onToggleFavorite: vi.fn()
  };

  it('renders todo item correctly', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockHandlers.onToggle}
        onDelete={mockHandlers.onDelete}
        onToggleFavorite={mockHandlers.onToggleFavorite}
      />
    );

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockHandlers.onToggle}
        onDelete={mockHandlers.onDelete}
        onToggleFavorite={mockHandlers.onToggleFavorite}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(mockHandlers.onToggle).toHaveBeenCalledWith(1, true);
  });

  it('calls onDelete when delete button is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockHandlers.onToggle}
        onDelete={mockHandlers.onDelete}
        onToggleFavorite={mockHandlers.onToggleFavorite}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(mockHandlers.onDelete).toHaveBeenCalledWith(1);
  });

  it('calls onToggleFavorite when favorite button is clicked', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockHandlers.onToggle}
        onDelete={mockHandlers.onDelete}
        onToggleFavorite={mockHandlers.onToggleFavorite}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /star/i }));
    expect(mockHandlers.onToggleFavorite).toHaveBeenCalledWith(1);
  });
});
