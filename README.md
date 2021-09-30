# Housing-management
毕设项目-在线房源管理系统
数据存储：mysql数据库（.sql文件）
```
直接导入SQL文件
```
数据来源：node爬虫（house_Reptile） 
```
node pachong.js 启动爬虫程序
```
数据分析：Python 数据分析(Listing-analysis.ipynb是分析房源的，watch.ipynb是获取到另外三个表数据的，统计用)
```
导入集成环境直接查看运行
```
页面展示：node服务端+vue前端(house_server+house_page)
开发流程：数据来源由爬虫程序爬取网页源数据，存到数据库，进行数据分析对比后再写入新的数据库表，作为数据源开发了一个展示系统，系统效果如下；
```
npm i 安装所需依赖：
// 服务端启动：npm start
// 前端启动：npm run dev
