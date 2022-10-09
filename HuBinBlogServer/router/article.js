// 文章的路由模块
const uniqid = require('uniqid');
const express = require("express");
const router = express.Router();

// 导入需要的处理函数模块
const article_handle = require("../router_handle/article");

// 导入 multer 和 path
const multer = require("multer");
const path = require("path");

// 创建 multer 的实例
// const uploads = multer({ dest: path.join(__dirname, "../uploads") });
const uploads = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, uniqid() + path.extname(file.originalname));
    },
  }),
});
// 导入验证数据的中间件
const expressJoi = require("@escook/express-joi");
// 导入需要的验证规则对象
const {
  add_article_schema,
  list_article_schema,
  del_article_schema,
  eidt_article_schema,
} = require("../schema/article");

//查询文章
router.get("/search", article_handle.searchArticle);
// 发布文章的路由
router.post(
  "/add",
  uploads.single("cover_img"),
  expressJoi(add_article_schema),
  article_handle.addArticle
);
router.get(
  "/list",
  expressJoi(list_article_schema),
  article_handle.listArticle
);
router.get(
  "/delete/:id",
  expressJoi(del_article_schema),
  article_handle.delArticle
);
router.post(
  "/edit",
  uploads.single("cover_img"),
  expressJoi(eidt_article_schema),
  article_handle.editArticle
);
router.get(
  "/:id",
  expressJoi(del_article_schema),
  article_handle.queryArticleDetail
);

module.exports = router;
