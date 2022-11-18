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
  collab: ICollab;
  setCollab: React.Dispatch<React.SetStateAction<ICollab>>;
}
