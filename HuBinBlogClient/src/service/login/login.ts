import hbRequest from '@/service'
import { IAccount, ILoginResult, IRegister } from './type'
import { IDataType } from '../type'

enum LoginAPI {
  AccountLogin = 'api/login/', //用法: login
  LoginUserInfo = '/users/', //用法: users/id
  UserMenus = '/role/', //用法: role/id/menu
  AccountRegister = 'api/reguser'
}

export function accountRegisterRequest(account: IRegister) {
  return hbRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountRegister,
    data: account
  })
}

export function accountLoginRequest(account: IAccount) {
  return hbRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return hbRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}
export function requestUserMenusByRoleId(id: number) {
  return hbRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
