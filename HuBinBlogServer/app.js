// 导入 express 模块
const express = require("express");
// 创建 express 的服务器实例
const app = express();

const joi = require("joi");

const multer = require("multer");

//导入并配置cors中间件
const cors = require("cors");
app.use(cors());

// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }));

//解析表单中的 JSON 格式的数据
app.use(express.json());

// const update = multer({
//   dest: "./uploads/temp",
// });
// app.use(update.any());
// 托管静态资源文件
app.use("/uploads", express.static("./uploads"));

// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
  // status 默认值为 1，表示失败的情况
  // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});

// 一定要在路由之前配置解析 Token 的中间件
const { expressjwt: expressJWT } = require("express-jwt");
const config = require("./config");

app.use(
  expressJWT({ secret: config.jwtSecretKey, algorithms: ["HS256"] }).unless({
  path: [/^\/api/, '/my/article/cates',/^\/my\/article\/list/,/^\/my\/article\/search/,/^\/my\/article\/[0-9]*/],
  })
);

//导入并使用用户路由模块
const useRouter = require("./router/user");
app.use("/api", useRouter);

// 导入并使用用户信息的路由模块
const userinfoRouter = require("./router/userinfo");
app.use("/my", userinfoRouter);

// 导入并使用文章分类的路由模块
const artCateRouter = require("./router/artcate");
app.use("/my/article", artCateRouter);

// 导入并使用文章的路由模块
const articleRouter = require("./router/article");
app.use("/my/article", articleRouter);
//导入图片上传的路由模块
const uploadRouter = require("./router/upload");
app.use("/api", uploadRouter);

// 定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err);
  // 身份认证失败后的错误
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败！");
  // 未知的错误
  res.cc(err);
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8080, function () {
  console.log("Express server running at http://127.0.0.1");
});
