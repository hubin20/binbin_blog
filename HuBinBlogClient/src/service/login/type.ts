export interface IAccount {
  email: string
  password: string
}

export interface IRegister {
  name: string
  password: string
  email: string
  rePassword: string
}

export interface ILoginResult {
  status: number
  message: string
  token: string
}
