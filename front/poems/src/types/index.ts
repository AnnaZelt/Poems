// front/poems/src/app/types/index.ts
export type RootState = {
  inputs: Input[];
  poems: Poem[];
  users: User[];
  auth: AuthState;
  ui: UiState;
  // Add more slices as needed
};

export type AuthState = {
  token: string;
  user: User | null;
  // Add other authentication-related state properties
};

export type UiState = {
  loading: boolean;
  error: string | null;
  // Add other UI-related state properties
};

export interface User {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  // Add other user-related properties
}

export interface Input {
  id: number;
  input_text: string;
}

export interface Poem {
  id: number;
  generated_peom: string;
}


