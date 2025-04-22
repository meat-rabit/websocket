// 在这里写服务端的代码

// 导入nodejs-websocket包
const ws = require('nodejs-websocket')
const POST = 3000 // 自定义的窗口
// 创建并启动服务
const server = ws.createServer(connect =>{
    console.log("创建了一个服务端,表示由用户链接") // 每当有用户使用这个链接，则执行这个
})
// 监听该链接
server.listen(POST,()=>{
    console.log("正在监听端口："+POST);
    
})