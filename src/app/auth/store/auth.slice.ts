import { User } from "../model/user.model";

export interface AuthSlice {
  user: User | null
}

export const initialAuthSlice: AuthSlice = {
  user: null
}
