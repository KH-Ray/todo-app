export interface TodoProps {
  id: string;
  content: string;
  marked: boolean;
  handleLoadPage: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  handleDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface LoginProps {
  handleUser: React.Dispatch<React.SetStateAction<null>>;
}

export interface User {
  id: string;
  username: string;
  token: string;
  todos: TodoProps;
}
