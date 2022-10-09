const joi = require("joi");

// 分别定义 标题、分类Id、内容、发布状态的校验规则
const title = joi.string().required();
const keyword = joi.string().required().allow("");
const cate_id = joi.number().integer().min(1).required();
const page = joi.number().integer().min(1).required();
const pageSize = joi.number().integer().min(1).required();
const content = joi.string().required().allow("");
const state = joi.string().valid("已发布", "草稿").required();

const pagenum = joi.number().integer().min(0).required();
const pagesize = joi.number().integer().min(1).required();
const cate_id_optional = joi.number().integer().min(1).optional();
const state_optional = joi.string().valid("草稿", "已发布").optional();

const id = joi.number().integer().min(1).required();

//验证规则对象 - 查询文章
// exports.search_article_schema = {
//   body: {
//     keyword,
//     cate_id,
//     page,
//     pageSize,
//   },
// };
// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state,
  },
};

exports.list_article_schema = {
  query: {
    pagenum,
    pagesize,
    cate_id: cate_id_optional,
    state: state_optional,
  },
};

exports.del_article_schema = {
  params: {
    id,
  },
};

exports.eidt_article_schema = {
  body: {
    id,
    title,
    cate_id,
    content,
    state,
  },
};
