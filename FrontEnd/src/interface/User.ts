export interface User {
  id: string;
  uniqueName: string;
  username: string;
  email: string;
  password: string;
  image: string | null;
  age: number;
}

export type UserwError = User & { error: string | null }