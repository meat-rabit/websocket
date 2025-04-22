const ws = require('nodejs-websocket')
const Post = 3090
// 消息类型
const TYPE_ENTER = 0
const TYPE_LEAVE = 1
const TYPE_MSG = 2

let count = 0 //代表进入的用户数量
// 创建websocket链接
const server = ws.createServer(connect=>{
    console.log("新的连接")
    count += 1 // 每当新用户进入，数量+1
    connect.userName = `用户${count}`

    broadcast({
        type:TYPE_ENTER,
        msg:`${connect.userName}进入了聊天室`,
        time:new Date().toLocaleString()
    })

    // 从浏览器中获取数据
    connect.on('text',data=>{
        broadcast({
            type:TYPE_MSG,
            msg:data,
            time:new Date().toLocaleString()
        })
    })

    // 关闭连接
    connect.on('close',data=>{
        broadcast({
            type:TYPE_LEAVE,
            msg:`${connect.userName}离开了聊天室`,
            time:new Date().toLocaleString()
        })
        count -= 1
    })
    // 发生异常
    connect.on('error',data=>{
        console.log("发生异常")
        
    })

    function broadcast(msg) {
        // server.connections代表所有用户
        server.connections.forEach(item=>{
            item.send(JSON.stringify(msg)) // 需要注意的是这边参数一个字符串，所以要用JSON.stringify()将对象转换成字符串
        })
    }
    
})
server.listen(Post,()=>{
    console.log("正在监听")
    
})