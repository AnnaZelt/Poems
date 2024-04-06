export interface Token {
  access: string | null;
  refresh: string | null;
  id: number | null;
  username: string | null;
  email: string | null;
  is_active: true | false;
}
