export interface ErrorPostProduct {
  status: number;
  data: { detail?: string, error?: string },
  error?: string;
}