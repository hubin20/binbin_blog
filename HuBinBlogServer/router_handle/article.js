// 文章的处理函数模块
const path = require("path");
const db = require("../db/index");

//查询博客
exports.searchArticle = async (req, res) => {
  let { keyword, cate_id, page, pageSize, is_delete } = req.query;
  is_delete = is_delete == null ? 0 : is_delete;
  page = page == null ? 1 : page;
  pageSize = pageSize == null ? 10 : parseInt(pageSize);
  cate_id = cate_id == null ? 0 : cate_id;
  keyword = keyword == null ? "" : keyword;

  let params = [];
  let whereSqls = [];
  if (cate_id != 0) {
    whereSqls.push(" `cate_id` = ? ");
    params.push(cate_id);
  }

  if (keyword != "") {
    whereSqls.push(" (`title` LIKE ? OR `content` LIKE ?) ");
    params.push("%" + keyword + "%");
    params.push("%" + keyword + "%");
  }
  if (is_delete != "") {
    whereSqls.push(" `is_delete` = ? ");
    params.push(is_delete);
  }

  let whereSqlStr = "";
  if (whereSqls.length > 0) {
    whereSqlStr = " WHERE " + whereSqls.join(" AND ");
  }

  //查分页数据
  let searchSql =
    " SELECT `id`,`cate_id`,`pub_date`,`title`,`is_delete`,`cover_img`,substr(content,1,50) as `content` FROM `articles` " +
    whereSqlStr +
    "  ORDER BY `pub_date` DESC LIMIT ?,? ";
  // console.log(whereSqlStr);
  // console.log(searchSql);
  // 1 10  2,10    3,5
  // 0,10  10,10   10,5
  let searchSqlParams = params.concat([(page - 1) * pageSize, pageSize]);

  //查询数据总数
  let searchCountSql =
    " SELECT count(*) AS `count` FROM `articles` " + whereSqlStr;
  let searchCountParams = params;

  //分页数据
  let searchResult = await db.async.query(searchSql, searchSqlParams);
  //查询数据总数
  let countResult = await db.async.query(searchCountSql, searchCountParams);
  if (searchResult.err == null && countResult.err == null) {
    res.send({
      code: 0,
      message: "查询成功",
      data: {
        keyword,
        cate_id,
        page,
        pageSize,
        results: searchResult.results,
        count: countResult.results[0].count,
      },
    });
  } else {
    res.send({
      code: 1,
      message: "查询失败",
    });
  }
};

// 发布文章的处理函数
exports.addArticle = (req, res) => {
  console.log(req.file);
  if (!req.file || req.file.fieldname !== "cover_img")
    return res.cc("文章封面是必选参数！");

  // TODO：证明数据都是合法的，可以进行后续业务逻辑的处理
  // 处理文章的信息对象

  const articleInfo = {
    // 标题、内容、发布状态、所属分类的Id
    ...req.body,
    // 文章封面的存放路径
    cover_img: path.join("/uploads", req.file.filename),
    // 文章的发布时间
    pub_date: new Date(),
  };
  console.log(req.auth);

  const sql = `insert into articles set ?`;
  db.query(sql, articleInfo, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("发布新文章失败！");
    res.cc("发布文章成功！", 0);
  });
};

exports.listArticle = async (req, res) => {
  const sql = `select a.id, a.title, a.pub_date, a.state,a.content, a.cover_img, b.name as cate_name
              from articles as a,article_cate as b 
              where a.cate_id = b.id and a.cate_id = ifnull(?, a.cate_id)  and a.state = ifnull(?, a.state) and a.is_delete = 0  limit ?,?`;

  let results = [];
  try {
    results = await db.queryByPromisify(sql, [
      req.query.cate_id || null,
      req.query.state || null,
      (req.query.pagenum - 1) * req.query.pagesize,
      req.query.pagesize,
    ]);
  } catch (e) {
    return res.cc(e);
  }

  // bugfix: 之前这里没有添加过滤条件 state和cate_id，导致 文章列表的分页pageBox中查询总数不正确
  const countSql =
    "select count(*) as num from articles where is_delete = 0 and state = ifnull(?,state) and cate_id = ifnull(?,cate_id)";
  let total = null;
  try {
    let [{ num }] = await db.queryByPromisify(countSql, [
      req.query.state || null,
      req.query.cate_id || null,
    ]);
    total = num;
  } catch (e) {
    return res.cc(e);
  }

  res.send({
    status: 0,
    message: "获取文章列表成功",
    data: results,
    total,
  });
};

exports.delArticle = async (req, res) => {
  const sql = "update articles set is_delete = 1 where id = ?";

  try {
    let result = await db.queryByPromisify(sql, req.params.id);

    if (result.affectedRows !== 1) {
      return res.cc("删除文章失败");
    }
  } catch (e) {
    res.cc(e);
  }

  res.send({
    status: 0,
    message: "删除文章成功",
  });
};

exports.editArticle = async (req, res) => {
  // 手动校验上传的文件
  if (!req.file || req.file.fieldname !== "cover_img") {
    return res.cc("文章封面必选");
  }

  const sql = "update articles set ? where id = ?";

  const articleinfo = {
    ...req.body,
    pub_date: new Date(),
    cover_img: path.join("/uploads", req.file.filename),
  };

  try {
    let result = await db.queryByPromisify(sql, [articleinfo, req.body.id]);
    if (result.affectedRows !== 1) {
      res.cc("更新文章失败");
    }
  } catch (e) {
    return res.cc(e);
  }

  res.send({
    status: 0,
    message: "更新文章成功",
  });
};

exports.queryArticleDetail = async (req, res) => {
  const sql = "select * from articles where id = ?";

  let result = [];
  try {
    result = await db.queryByPromisify(sql, req.params.id);
  } catch (e) {
    return res.cc(e);
  }

  res.send({
    status: 0,
    message: "查询文章详情成功",
    data: result[0],
  });
};
