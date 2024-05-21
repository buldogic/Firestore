export type FieldType = {
  email?: string;
  password?: string;
  handleClick?: (data: FieldType) => void;
};

export type User = {
  id:string,
  name: string,
  surname: string,
  email: string,
  // likeCity: [],
  // likeCountry:[],
  country: string,
  img: string,
}

export type City = {
  id: number;
  name: string;
  is_capital: boolean;
  description: string;
  img: string;
  population: number;
  sight: string;
  country: string;
};

export type Country = {
  name: string;
  id:number;
  description: string;
  population: number;
  img: string;
}

export type addCity ={
  id: number;
  name: string;
  is_capital: boolean;
  description: string;
  img: string;
  population: number;
  sight: string;
  countryId: number;
  country: string;
}
