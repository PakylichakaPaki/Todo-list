export interface TodoAttributes {
  name: string | null;
  description: string | null;
  status: 'done' | 'open' | 'working' | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Todo {
  id: number;
  attributes: TodoAttributes;
  isFavorite?: boolean;
}

export interface TodoData {
  id: number;
  attributes: TodoAttributes;
}

export interface TodoResponse {
  data: TodoData[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  }
}

export type TodoFilter = 'all' | 'completed' | 'active' | 'favorite';
