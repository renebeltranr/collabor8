export interface ICollab {
  createdAt?: string;
  name?: string;
  owner: IUser;
  pendingtracks?: string[];
  tracks?: Array<any>;
  updatedAt?: string;
  //__v: number;
  _id?: string;
}

export type IUser = {
  username: string;
  password: string | undefined;
  bio: string;
  contry: string;
  createdAt: string;
  instruments: string[];
  othercollabs: string[];
  owncollabs: string[];
  profilepic: string;
  updatedAt: string;
  //__v: number;
  _id: string;
};

export interface iGlobalContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  username: string;
}

export interface IAuthApiService {
  register?: (user: IUser) => Promise<Response>;
  login?: (user: IUser) => Promise<Response>;
  profile?: (username: string) => Promise<Response>;
  me?: () => Promise<Response>;
  logout?: () => Promise<Response>;
  profileUpdate?: (data: DataUpdate) => Promise<Response>;
}

export type DataUpdate = {
  [key: string]: string;
};
