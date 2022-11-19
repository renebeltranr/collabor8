export interface ICollab {
  createdAt?: string;
  name?: string;
  owner?: IUser;
  pendingtracks?: string[];
  tracks?: Array<any>;
  updatedAt?: string;
  //__v: number;
  _id?: string;
}

export type IUser = {
  username: string;
  password?: string | undefined;
  bio: string;
  country: string;
  createdAt?: string;
  instruments?: string[];
  othercollabs?: string[];
  owncollabs: string[];
  profilepic?: string;
  updatedAt?: string;
  //__v: number;
  _id?: string;
};

export interface IGlobalContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  username: string;
}

export interface HTMLWithSource extends HTMLElement {
  src: string,
}

export interface HTMLWithDisabled extends HTMLElement {
  disabled: boolean,
}

export type ICollabApiService = {
  getCollabs?: () => Promise<void|Response>,
  newCollab?: (cb: ICollab) => Promise<void|Promise<Response>>,
  getUserCollabs?: (id: Number) => Promise<void|Response>,
  getCollab?: (id: string | undefined) => Promise<void|Response>,
  saveTrack?: (data: ISaveTrack) => Promise<Promise<Response>>,
  saveSettings?: (data: any) => Promise<Response>,
  acceptTrack?: (data) => Promise<Response>,
  denyTrack?: (data) => Promise<Response>,
  deleteTrack?: (data) => Promise<Response>,
  deleteCollab?: (data) => Promise<Response>,
}

export type IError = {
  error?: any,
  message?: string,
  status: number
}

export type ISaveTrack = {
  url: string,
  cid: number,
  username: string
}

export type ISettings = {
  cid: number,
  collab:
}