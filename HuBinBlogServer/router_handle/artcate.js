// 这是路由处理函数模块

// 导入数据库操作模块
const db = require("../db/index");

// 获取文章分类列表的处理函数
exports.getArtCates = (req, res) => {
  // 定义查询分类列表数据的 SQL 语句
  const sql = `select * from article_cate where is_delete=0 order by id asc`;
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: "获取文章分类数据成功！",
      data: results,
    });
  });
};

// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
  // 1. 定义查重的 SQL 语句
  const sql = `select * from article_cate where name=?`;
  // 2. 执行查重的 SQL 语句
  db.query(sql, [req.body.name], (err, results) => {
    // 3. 判断是否执行 SQL 语句失败
    if (err) return res.cc(err);

    // 4.1 判断数据的 length
    if (results.length === 1) {
      if (results[0].is_delete == 1) {
        const sql = `update article_cate set is_delete=0 where name=?`;
        db.query(sql, [req.body.name], (err, results) => {
          if (err) return res.cc(err);
          if (results.affectedRows === 1)
            return res.cc("新增文章分类成功！", 0);
        });
      } else {
        return res.cc("文章分类名被占用！");
      }
    } else {
      // 定义插入文章分类的 SQL 语句
      const sql = `insert into article_cate set ?`;
      // 执行插入文章分类的 SQL 语句
      db.query(sql, req.body, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc("新增文章分类失败！");
        return res.cc("新增文章分类成功！", 0);
      });
    }
  });
};

// 删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
  // 定义标记删除的 SQL 语句
  const sql = `update article_cate set is_delete=1 where id=?`;
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("删除文章分类失败！");
    res.cc("删除文章分类成功！", 0);
  });
};

// 根据 Id 获取文章分类的处理函数
exports.getArtCateById = (req, res) => {
  // 定义根据 ID 获取文章分类数据的 SQL 语句
  const sql = `select * from article_cate where id=?`;
  // 调用 db.query() 执行 SQL 语句
  db.query(sql, req.params.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("获取文章分类数据失败！");
    res.send({
      status: 0,
      message: "获取文章分类数据成功！",
      data: results[0],
    });
  });
};

// 根据 Id 更新文章分类的处理函数
exports.updateCateById = (req, res) => {
  // 定义查重的 SQL 语句
  const sql = `select * from article_cate where Id<>? and (name=?)`;
  // 调用 db.query() 执行查重的 SQL 语句
  db.query(sql, [req.body.id, req.body.name], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);

    // 判断名称和别名被占用的4种情况
    if (results.length === 1) return res.cc("分类名称被占用，请更换后重试！");

    // 定义更新文章分类的 SQL 语句
    const sql = `update article_cate set ? where Id=?`;
    // 执行更新文章分类的 SQL 语句
    db.query(sql, [req.body, req.body.id], (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc("更新文章分类失败！");
      res.cc("更新文章分类成功！", 0);
    });
  });
};
