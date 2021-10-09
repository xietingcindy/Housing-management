var express = require('express');
var router = express.Router();

var houseDao = require('../dao/houseDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/queryAll', function(req, res, next) {
    houseDao.queryAll(req, res, next);
});
router.get('/querySearch', function(req, res, next) {
    houseDao.querySearch(req, res, next);
});
router.post('/queryTotal', function(req, res, next) {
    houseDao.queryTotal(req, res, next);
});
router.get('/queryDist', function(req, res, next) {
    houseDao.queryDist(req, res, next);
});
router.get('/queryEcharts', function(req, res, next) {
    houseDao.queryEcharts(req, res, next);
});
router.get('/queryFloor', function(req, res, next) {
    houseDao.queryFloor(req, res, next);
});
router.get('/queryStyle', function(req, res, next) {
    houseDao.queryStyle(req, res, next);
});

module.exports = router;