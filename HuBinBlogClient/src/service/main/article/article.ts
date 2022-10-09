import hbRequest from '@/service'

import { IDataType } from '@/service/type'

export function getArticleCateList(url: string) {
  return hbRequest.get<IDataType>({
    url: url
  })
}

export function addArticleCate(url: string, payload: any) {
  return hbRequest.post<IDataType>({
    url: url,
    data: payload
  })
}

export function deleteArticleCate(url: string) {
  return hbRequest.get<IDataType>({
    url: url
  })
}
export function updateArticleCate(url: string, payload: any) {
  return hbRequest.post<IDataType>({
    url: url,
    data: payload
  })
}

export function listArticle(url: string) {
  return hbRequest.get<IDataType>({
    url: url,
  })
}

//添加文章
export function addArticle(url: string,payload: any) {
  return hbRequest.post<IDataType>({
    url: url,
    data: payload
  })
}

//根据ID获取文章详情
export function getArticleById(url: string) {
  return hbRequest.get<IDataType>({
    url: url
  })
}
export function deleteArticleById(url: string) {
  return hbRequest.get<IDataType>({
    url: url
  })
}
//查询
export function searchArticle(url: string) {
  return hbRequest.get<IDataType>({
    url: url
  })
}
