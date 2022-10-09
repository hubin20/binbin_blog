//导入mysql模块
const mysql = require("mysql");
const { promisify } = require("util");

// 创建数据库连接对象
const db = mysql.createPool({
  host: "43.138.167.206",
  user: "hubin",
  password: "3wpxr5RRbJksXGS5",
  database: "api_server_cms",
});
db.async = {};
db.async.query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      resolve({ err, results });
    });
  });
};
queryByPromisify = promisify(db.query).bind(db);

db.queryByPromisify = queryByPromisify;
// 向外共享 db 数据库连接对象
module.exports = db;
