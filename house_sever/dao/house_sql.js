// dao/userSqlMapping.js
// CRUD SQL语句
var house = {
    querySearch: `select * from house where city=? and address like ? limit ?,?`, //搜索框模糊匹配
    queryEcharts: 'select dist,perprice,counts from watch0 where city=?', //查询城市的地区房价和数量
    queryFloor: 'select floor,counts from watch1 where city=?', //查询当前城市楼层分布
    queryStyle: 'select value,name from watch2 where city=?', //查询当前城市格局分布
    queryTotal: 'select count(*) from house where city=?', // 查询总条数
    queryByPage: 'select * from house where city=? limit ?,30', //分页查询
    queryAll: 'select * from house where city=? limit 4',
    queryDist: 'select dist from watch0 where city=?' //查询城市的所有地区
};

module.exports = house;