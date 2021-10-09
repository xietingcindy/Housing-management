// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./house_sql');

// 使用连接池，提升性能
var pool = mysql.createPool($util.extend({}, $conf.mysql, { multipleStatements: true }));
// var connection =  mysql.createConnection({ multipleStatements: true });

// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    //首页预览接口
    queryAll: function(req, res, next) {
        let params = +req.query.city;
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, params, function(err, result) {
                console.log($sql.queryAll)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    // 搜索框接口
    querySearch: function(req, res, next) {
        // let city = req.body.params.city;
        let city = 1;
        // let search = req.body.search;
        let search = '文宝苑'
            // let page1 = Number(req.body.params.page) || 1;
            // let pageSize = req.body.params.pageSize;
        let page = 0;
        let pageSize = 30;
        // let page = (page1 - 1) * pageSize;
        let param = [city, "%" + search + "%", page, pageSize]
        pool.getConnection(function(err, connection) {
            connection.query($sql.querySearch, param, function(err, result) {
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    //查询地区接口
    queryDist: function(req, res, next) {
        let params = +req.query.city;
        // let city = 1;
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryDist, params, function(err, result) {
                // console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    queryEcharts: function(req, res, next) {
        let city = +req.query.city;
        // let city = 1;
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryEcharts, city, function(err, result) {
                // console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    //楼层分析接口
    queryFloor: function(req, res, next) {
        let city = +req.query.city;
        // let city = 1;
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryFloor, city, function(err, result) {
                // console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    //户型分析接口
    queryStyle: function(req, res, next) {
        let city = +req.query.city;
        // let city = 1;
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryStyle, city, function(err, result) {
                // console.log(result)
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    //分页查询接口
    queryTotal: function(req, res, next) {
        // console.log(req.body)
        let searchInput = req.body.params.search
        let searchForm = req.body.params.searchForm
            // console.log(searchForm)
        let page1 = Number(req.body.params.page) || 1;
        let pageSize = req.body.params.pageSize;
        let page = (page1 - 1) * pageSize;
        console.log(page, pageSize)
            // let page = 1;
            // let pageSize = 5
            // let params = +req.query.city;
        let city = req.body.params.city
            // console.log(city)
        let dist = searchForm.dist
            // console.log(dist)
        let price = searchForm.price
            // console.log(price)
        let price1 = price[0]
        let price2 = price[1]
        let flag = searchForm.flag
            // console.log(flag)
        let sql = ''
        let canshu = []
        pool.getConnection(function(err, connection) {
            if (searchInput != '' && dist == '' && flag == '' && price.length == 0) {
                // if (searchInput != '') {
                sql = $sql.querySearch
                    // sql = 'select * from house where city=? and title like ? limit ?,?'
                canshu = [city, "%" + searchInput + "%", page, pageSize]
            } else if (dist != '' && flag == '' && price.length == 0 && searchInput == '') {
                sql = `SELECT * from house where city=? and dist=? limit ?,?;`
                canshu = [city, dist, page, pageSize]
            } else if (flag != '' && dist == '' && price.length == 0 && searchInput == '') {
                sql = `SELECT * from house where city=? and flag=? limit ?,?;`
                canshu = [city, flag, page, pageSize]
            } else if (price.length != 0 && dist == '' && flag == '' && searchInput == '') {
                sql = `SELECT * from house where city=? and price>? and price <? limit ?,?;`
                canshu = [city, price1, price2, page, pageSize]
            } else if (dist != '' && flag != '' && price.length == 0 && searchInput == '') {
                sql = `SELECT * from house where city=? and dist=? and flag=? limit ?,?;`
                canshu = [city, dist, flag, page, pageSize]
            } else if (dist != '' && price.length != 0 && flag == '' && searchInput == '') {
                sql = `SELECT * from house where city=? and dist=? and price>? and price<? limit ?,?;`
                canshu = [city, dist, price1, price2, page, pageSize]
            } else if (price.length != 0 && flag != '' && dist == '' && searchInput == '') {
                sql = `SELECT * from house where city=? and flag=? and price>? and price<? limit ?,?;`
                canshu = [city, flag, price1, price2, page, pageSize]
            } else if (price.length == 0 && flag == '' && dist == '' && searchInput == '') {
                sql = `SELECT * from house where city=? limit ?,?;`
                canshu = [city, page, pageSize]
            } else {
                sql = `SELECT * from house where city=? and dist=? and price>? and price<? and flag=? limit ?,?;`
                canshu = [city, dist, price1, price2, flag, page, pageSize]
            }
            connection.query(sql, canshu, function(err, rows, fileds) {
                if (err) {
                    throw err;
                }
                let sql = `select count(*) as total from house where city=?`
                let canshu1 = []
                    // && dist == '' && flag == '' && price.length == 0
                if (searchInput != '') {
                    sql += ` and address like ?`
                    canshu1 = [city, "%" + searchInput + "%"]
                } else if (dist != '' && flag == '' && price.length == 0) {
                    sql += ` and dist=?;`
                    canshu1 = [city, dist]
                } else if (flag != '' && dist == '' && price.length == 0) {
                    sql += ` and flag=?;`
                    canshu1 = [city, flag]
                } else if (price.length != 0 && dist == '' && flag == '') {
                    sql += ` and price>? and price<?;`
                    canshu1 = [city, price1, price2]
                } else if (dist != '' && flag != '' && price.length == 0) {
                    sql += ` and dist=? and flag=?`
                    canshu1 = [city, dist, flag]
                } else if (dist != '' && price.length != 0 && flag == '') {
                    canshu1 = [city]
                } else if (price.length != 0 && flag != '' && dist == '') {
                    sql += ` and flag=? and price>? and price<?;`
                    canshu1 = [city, flag, price1, price2]
                } else if (price.length == 0 && flag == '' && dist == '') {
                    // sql = `select count(*) as total from house where city=?`
                    canshu1 = [city]
                } else {
                    sql += ` and dist=? and price>? and price<? and flag=?;`
                    canshu1 = [city, dist, price1, price2, flag]
                }
                connection.query(sql, canshu1, (err, rows1, fileds) => {
                    // console.log(rows1)
                    let total = rows1[0]['total']
                    res.json({
                        message: "ok",
                        data: {
                            rows,
                            total
                        },
                        code: '200'
                    });
                    connection.release();
                })
            })
        });
    },
};