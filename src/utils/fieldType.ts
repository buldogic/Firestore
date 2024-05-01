export type FieldType = {
  email?: string;
  password?: string;
  handleClick?: (data: FieldType) => void;
};

export type City = {
  id: string;
  name: string;
  is_capital: boolean;
  description: string;
  img: string;
  population: number;
  sight: string;
};
