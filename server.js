var http = require("http");
var express = require("express");
var app = express();
var webSocketServer = require("ws").Server
var firstRequest;
var nameRoom = 0;
var timerRequest;
const TIME_REQUEST = 30000;

app.use(express.static("public"));
var server = http.createServer(app);
server.listen(process.env.PORT);

var wss = new webSocketServer({server: server});
wss.on("connection", function(ws) 
{
	//console.log("Create new websocket connection")
	sendMessage(nameRoom, wss.clients)
});

app.get('/get_room', function(req, res)
{
    if (firstRequest) 
    {
        var newNameRoom = getNameRoom();
        firstRequest.status(200).send(newNameRoom);
        res.status(200).send(newNameRoom);

	sendMessage(newNameRoom, wss.clients);
        deleteFirstRequest();
    }
    else
    {
        //console.log('Запоминаем первый запрос');
        firstRequest = res;

        //console.log('Запускаем таймер на уделение запроса с временем = ' + TIME_REQUEST);
        timerRequest = setTimeout(deleteFirstRequest, TIME_REQUEST);
    }
});

function sendMessage(msg, clients) {
    msg = JSON.stringify(msg);

    for (var i = 0; i < clients.length; i++) {
        //console.log('send msg = ' + msg);
        clients[i].send(msg);
    }
};

function createRoom() 
{
    //console.log('Создаем название комнаты');
    return ++nameRoom;
}

function getNameRoom(sender) 
{
    //console.log('Посылаем название комнаты');
    return String( createRoom() );
}

function deleteFirstRequest() 
{
    clearTimeout(timerRequest);
    firstRequest = undefined;

    //console.log('Удаляем запрос');
}