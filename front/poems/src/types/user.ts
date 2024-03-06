export interface User {
    id: number | null;
    is_superuser: true | false;
    username: string |null;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    is_staff: true | false;
    is_active: true | false;
  }