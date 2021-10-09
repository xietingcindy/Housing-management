/* 封装数据库连接池模块，配置并执行语句 */
// 引入MySQL
const mysql = require("mysql")
// 创建数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'house_datas',
    port: 3306,
    charset:'utf8'
})
// 封装执行SQL语句函数
exports.query = (sql,data) => {
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection)=>{
            if(err) {
                resolve(err);
                return;
            }
            connection.query(sql,[data],(error,result) =>{
                if(error){
                    reject(error);
                } else {
                    resolve(result);
                    console.log("success!!")
                }
                connection.release();
            })
        })
    })
}


