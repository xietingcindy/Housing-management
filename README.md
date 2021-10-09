# Housing-management
毕设项目-在线房源管理系统
数据存储：mysql数据库（.sql文件）
```
直接导入SQL文件---house_datas.sql
```
数据来源：node爬虫（house_Reptile） 
```
node pachong.js   // 启动爬虫程序，两个pachong.js文件
```
数据分析：Python 数据分析(Listing-analysis.ipynb是分析房源的，watch.ipynb是获取到另外三个表数据的，统计用)
```
导入jupter notesbook查看运行
```
页面展示：
node.js服务端+vue前端(系统源码见 house_server+house_page)
开发流程：数据来源由爬虫程序爬取网页源数据，存到数据库，进行数据分析对比后再写入新的数据库表，作为数据源开发了一个展示系统；

系统详情请见博客 https://blog.csdn.net/qq_40420294/article/details/120567807
```
npm i 安装所需依赖：
```
```
npm start  // 服务端启动
npm run dev // 前端启动
```