
## 本地运行
```javascript
npm install //or yarn
npm run start
```
## 打包软件
```javascript
npm install //or yarn, 若已安装则无需次命令
npm run pack
```
软件将会打包到`pack`目录下，双击运行

## 注意
打包时建议用yarn安装npm包，因为npm install会在node_modules中安装隐藏目录，导致electron-packager打包的时候无法将electron等大文件删除，打包出来的软件包会很大。

## LISCENCE
MIT
