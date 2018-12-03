var socket = require('socket.io-client')('https://ciabattaaiheroku.herokuapp.com/');
var SerialPort = require('serialport');
var fs = require('fs');
var TelegramBot = require('node-telegram-bot-api');
var Constants = require('./My/constants');

const option = {mode: 0o600};

//const token = Constants.BotToken;
//const bot = new TelegramBot(token, {polling: true});

if (Constants.SerAvailable){
  var port = new SerialPort(Constants.ComName, {
    baudRate: Constants.ComBound
  });
  console.log(`Arduino Collegato su porta ${JSON.stringify(Constants.ComName)}`);
}

let AutorizedId = [];
const ExStrategyBotDataPath = "./My files/ExtrategyBotData.json";
const credenziali = {};
credenziali[Constants.HeadersKey] = Constants.HeadersValue;
const MasterID = Constants.AutorizedMasterID;

let Color,
    Modalita,
    Todo,
    ToControl,
    ModToControl;

let ReleStat = [8];
for (let i = 0; i < 8; i++){
  ReleStat[i] = false;
}

let ReleConfig, ReleData;

fs.readFile('./My/ReleConfig.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  ReleConfig = JSON.parse(data);
  socket.emit('start', JSON.stringify(ReleConfig));
});

socket.on('ToControl', function(_ToControl){
  console.log('ToControl: ' + _ToControl);
  for (let i = 0; i < ReleConfig.length; i++){
    ReleData = ReleConfig[i];
    if(JSON.parse(_ToControl) == ReleData[0]){
      ToControl = ReleData[1];
      ModToControl = ReleData[2];
    }
  }
});

socket.on('ToDo', function(_ToDo){
  console.log('Todo: ' + _ToDo);
  ToDo = JSON.parse(_ToDo);

  switch(ToDo){
    case "Accendi":
      if(!ReleStat[ToControl]){
        if (Constants.SerAvailable){
          port.write('0');
          port.write(ToControl);
          port.write('1');
          port.write(ModToControl);
          port.write('9');
        }

        socket.emit("changeReleNum", ToControl);
        socket.emit("changeRelStatus", '1');
        console.log("Serial: 0" + ToControl + "1" + ModToControl + "9");
        ReleStat[ToControl] = true;
      }
    break;

    case "Spegni":
      if(ReleStat[ToControl]){
        if (Constants.SerAvailable){
          port.write('0');
          port.write(ToControl);
          port.write('0');
          port.write(ModToControl);
          port.write('9');
        }

        socket.emit("changeReleNum", ToControl);
        socket.emit("changeRelStatus", '0');
        console.log("Serial: 0" + ToControl + "0" +ModToControl + "9");
        ReleStat[ToControl] = false;
      }
    break;
  }

  //disegno dell'array di stato
  console.log('_________________________________________________________________');
  console.log('|   1   |   2   |   3   |   4   |   5   |   6   |   7   |   8   |');
  console.log('| ' + ReleStat[0] +' | ' + ReleStat[1] + ' | ' + ReleStat[2] + ' | ' + ReleStat[3] + ' | ' + ReleStat[4] + ' | ' + ReleStat[5] + ' | ' + ReleStat[6] + ' | '+ ReleStat[7] + ' |');
  console.log('|_______________________________________________________________|');
});

socket.on('Modalita', function(_Modalita){
  console.log('Modalita: ' + _Modalita);
  Modalita = JSON.parse(_Modalita);
});

socket.on('Color', function(_Color){
  console.log('Modalita: ' + _Color);
  Color = JSON.parse(_Color);
});

if (SerAvailable == true){
  port.on('error', function(err) {
    console.log('Error: ', err.message);
  })
}
