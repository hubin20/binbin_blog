import { defineStore } from 'pinia'

import {
  getArticleCateList,
  addArticleCate,
  deleteArticleCate,
  updateArticleCate,
  listArticle,
  addArticle,
  getArticleById,
  deleteArticleById,
  searchArticle
} from '@/service/main/article/article'

export const useArticleCateStore = defineStore('ArticleCateStore', {
  state: () => {
    return {}
  },
  actions: {
    //分类
    async articleCateListAction(url: string) {
      const cateListResult = await getArticleCateList(url)

      return cateListResult
    },
    async addCateAction(url: string, payload: any) {
      const addCateResult = await addArticleCate(url, payload)
      return addCateResult
    },
    async deleteCateAction(url: string) {
      const deleteCateResult = await deleteArticleCate(url)
      return deleteCateResult
    },
    async updateCateAction(url: string, payload: any) {
      const updateCateResult = await updateArticleCate(url, payload)
      return updateCateResult
    },
    //文章
    async articleListAction(url: string) {
      const listResult = await listArticle(url)
      return listResult
    },
    async articleAddAction(url: string, payload: any) {
      const addResult = await addArticle(url,payload)
      return addResult
    },
    async getArticleByIdAction(url: string) {
      const getResult = await getArticleById(url)
      return getResult
    },
    async deleteArticleByIdAction(url: string) {
      const delResult = await deleteArticleById(url)
      return delResult
    },
    async searchArticleAction(url: string) {
      const searchResult = await searchArticle(url)
      return searchResult
    }
  }
})
