const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)

//Configuracion para Socket.io en el servidos
const {Server} = require('socket.io')
const io = new Server(server)


// para probar debemos escuchar al evento conection en busca de sockets entrante y lo mostramos por consola
io.on('connection',(socket)=>{
    console.log('Un usuario se a conectado') //Cualquier evento lo va a escuchar
    //el mensaje que se configuro en el cliente se enviar al servido y se lo mostrara por consola
    /*socket.on('chat', (msg)=>{
        console.log('Mensaje: '+msg)
    })*/
    socket.on('chat', (msg)=>{
        io.emit('chat',msg)
    })
})

//Para ver como se interactua con el cliente
app.get('/',(req,res)=>{
    //res.send('<h1>Aplicacion Chad</h1>')
    //Enviar un archivo
    //console.log(__dirname)
    res.sendFile(`${__dirname}/cliente/index.html`) //Uso de plantillas
    app.use(express.static(__dirname+'/cliente'));
})

//Configuracion del puertoo
server.listen(3000,()=>{
    console.log('Servidor corriendo enel puerto 3000')
})
