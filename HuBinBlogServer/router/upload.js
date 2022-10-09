// 导入 express 模块
const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const uniqid = require("uniqid");

const uploads = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads/temp"));
    },
    filename: function (req, file, cb) {
      cb(null, uniqid() + path.extname(file.originalname));
    },
  }),
});


router.post("/img/upload",uploads.array('file') ,async (req, res) => {
  console.log(req.files )
  if (!req.files) {
    res.send({
      errno: 1, // 只要不等于 0 就行
      message: "失败信息",
    });
    return;
  }
  let files = req.files;
  let ret_files = [];
  for (let file of files) {
    //获取名字后缀
    let file_ext = file.originalname.substring(
      file.originalname.lastIndexOf(".") + 1
    );
    //随机文件名字
    let file_name = uniqid() + "." + file_ext;

    //修改名字并移动文件
    fs.renameSync(
      process.cwd() + "/uploads/temp/" + file.filename,
      process.cwd() + "/uploads/" + file_name
    );
    console.log(file_name);
    ret_files.push("/uploads/" + file_name);
  }
  res.send({
    errno: 0, // 注意：值是数字，不能是字符串
    data: {
      url: ret_files[0], // 图片 src ，必须
    },
  });
});

// 将路由对象共享出去
module.exports = router;
