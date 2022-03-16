const express = require("express")
const path=require("path")
const http = require('http')
const socketio=require('socket.io')
const {generateMessage,generateLocationMessage}=require("./utils/generateMessage")

const app = express()
const server=http.createServer(app)
const io=socketio(server)




const port=process.env.PORT||3000
const publicPath=path.join(__dirname, '../public')
app.use(express.static(publicPath))

let last_text=''
io.on('connection',(socket)=>{
    console.log('new web socket connected')

    socket.emit("Message",generateMessage(last_text))

    socket.broadcast.emit('Message',generateMessage('a new user has joined'))


    socket.on('sentMessage',(message,callback)=>{
      last_text=message
      
      io.emit("Message",generateMessage(message))
      callback("delivered")

    })
    socket.on('disconnect',()=>{
      io.emit('Message',generateMessage("an user has disconnected"))
    })
  
    socket.on('sendLocation',(position,callback)=>{
      io.emit('location-message', generateLocationMessage(position))
      callback()
    })
  
})



server.listen(port,()=>{
    console.log(`Listening on ${port}`)
})


// socket.emit('countUpdated',count)


//   socket.on("increment",()=>{
//       count++
//       io.emit('countUpdated',count)
//   })

