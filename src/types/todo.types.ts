export interface TodoAttributes {
  name: string | null;
  description: string | null;
  status: Status;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type Status = 'done' | 'open' | 'working' | null;

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
