export interface Poem {
    id: number;
    input_id: number;
    poem_text: string;
    user: number | null;
    is_active: boolean;
  }
