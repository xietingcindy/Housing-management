/* 爬取贝壳网的租房信息，并存入数据库houses表中 */
const https = require('https');
const cheerio = require('cheerio');


const startPage = 1; // 开始页
const endPage = 100; // 结束页

let page = startPage; // 当前抓取页
let total = 0; // 数据总数
const citys = [0, 1, 2]; //城市数组 0:北京 1:上海 2:深圳
const urls = ['https://bj.zu.ke.com/zufang/', 'https://sh.zu.ke.com/zufang/', 'https://sz.zu.ke.com/zufang/'] //贝壳网链接
    // const urls = ['https://bj.lianjia.com/zufang/', 'https://sh.lianjia.com/zufang/', 'https://sz.lianjia.com/zufang/']; // 爬取URL

// 初始化url
const url = urls[1]; //当前城市修改值


//处理房价为范围的数据
function check(str) {
    return str.split('-')[0]
}

let result = [];
let db = require("./db.js")
let sql = "insert into house1 (`flag`,`title`,`price`,`city`,`dist`,`address`,`size`,`direction`,`style`,`floor`,`resource`,`time`,`tag`,`href`,`pic`) values ?"
    // 抓取数据
getData(url)

function getData(url) {

    https.get(url, res => {
        let data = '';
        res.on('data', function(chunk) {
            data += chunk;
        });
        res.on('end', function() {
            let formatData = filter(data); // 筛选出需要的数据
            // console.log(formatData);
            result = result.concat(formatData); // 拼接此次抓取到的数据
            // console.log(result);
            page++;
            if (page <= endPage) { // 继续抓取下一页
                // 通过分析 url 规律，拼出下一页的链接
                let tempUrl = 'https://sh.zu.ke.com/zufang/pg' + page + '#contentList/';
                getData(tempUrl); // 递归继续抓取
            } else { // 结束抓取
                db.query(sql, result)
            }
        })
    });
}

/*处理抓取到的dom函数*/
function filter(data) {
    let final = []; // 用来存储本页所有数据信息
    //将页面源代码转换为$对象
    let $ = cheerio.load(data);

    if (total == 0) // 如果没获取过总数，那么获取一次总数
        total = $('#content .content__article .content__title span.content__title--hl').text();
    // 找到列表外层
    let items = $('#content .content__article .content__list .content__list--item');
    // 遍历处理每一条数据（each是cheerio提供的方法，不可以使用forEach）
    items.each((index, item) => {
        let temp = []; // 用来存储此条数据的信息

        let city = citys[1]; //爬取数据前时可定义，根据城市修改

        let titles = $(item).find('.twoline').text().replace(/\s/g, '').split('·');
        let flag = titles[0];
        let title = titles[1];
        let price1 = $(item).find('span.content__list--item-price').text().replace(/元\/月/g, '') // 价格
        let price = parseFloat(check(price1))
            // let price = $(item).find('span.content__list--item-price').text().replace(/\D/g, ''); // 价格
        let info = $(item).find('p.content__list--item--des').text().replace(/\s/g, '').split('/')
        let resource = $(item).find('span.brand').text().replace(/\s/g, '') || ''; //来源
        let time = $(item).find('span.content__list--item--time').text(); // 发布时间
        let pic = $(item).find('.content__list--item--aside').children('img').attr('data-src'); //图片
        let href = 'https://bj.lianjia.com/' + $(item).find('.content__list--item--aside').attr('href') //链接详情
        let dist = (info[0].split('-'))[0]; // 地区
        // console.log(dist);
        let tag = $(item).find('p.content__list--item--bottom').text().replace(/\s/g, ''); //标签
        let [address, size, direction, style, floor] = info //详细信息包括 地址，面积，朝向，规格，楼层
        size = size.replace(/\D/g, '');
        // floor = floor.replace(/\D/g, '');
        temp.push(flag, title, price, city, dist, address, size, direction, style, floor, resource, time, tag, href, pic);
        final.push(temp)
    });
    return final;
}