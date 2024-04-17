export type User = {
  user_id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
};


export type authUser = Pick<User, 'username' | 'email'> & { password: string };