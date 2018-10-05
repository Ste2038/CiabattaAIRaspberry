var socket = require('socket.io-client')('https://ciabattaaiheroku.herokuapp.com/');
var SerialPort = require('serialport');
var fs = require('fs');
var TelegramBot = require('node-telegram-bot-api');
var Constants = require('./My/constants');

const option = {mode: 0o600};

//const token = Constants.BotToken;
//const bot = new TelegramBot(token, {polling: true});

var port = new SerialPort(Constants.ComName, {
  baudRate: Constants.ComBound
});

let AutorizedId = [];
const ExStrategyBotDataPath = "./My files/ExtrategyBotData.json";
const credenziali = {};
credenziali[Constants.HeadersKey] = Constants.HeadersValue;
const MasterID = Constants.AutorizedMasterID;

let Color,
    Modalita,
    Todo,
    ToControl;

let SerAvailable = false;

let Rele = [8];
for (let i = 0; i < 8; i++){
  Rele[i] = false;
}

socket.on('ToControl', function(_ToControl){
  console.log('ToControl: ' + _ToControl);
  switch(JSON.parse(_ToControl)){
    case "Computer":
      ToControl = 0;
    break;

    case "Stereo":
      ToControl = 1;
    break;

    case "Led":
      ToControl = 2;
    break;

    case "Monitor":
      ToControl = 3;
    break;

    case "Stampante":
      ToControl = 4;
    break;
  }
});

socket.on('ToDo', function(_ToDo){
  console.log('Todo: ' + _ToDo);
  ToDo = JSON.parse(_ToDo);

  switch(ToDo){
    case "Accendi":
      if(!Rele[ToControl]){
          if (SerAvailable){
            port.open();
            port.write(ToControl);
            port.write("1");
            port.close();
          }
        console.log(ToControl);
        console.log("1");
        Rele[ToControl] = true;
      }
    break;

    case "Spegni":
      if(Rele[ToControl]){
        if (SerAvailable){
          port.open();
          port.write(ToControl);
          port.close();
        }
        console.log(ToControl);
        console.log("0");
        Rele[ToControl] = false;
      }
    break;
  }
});

socket.on('Modalita', function(_Modalita){
  console.log('Modalita: ' + _Modalita);
  Modalita = JSON.parse(_Modalita);
});

socket.on('Color', function(_Color){
  console.log('Modalita: ' + _Color);
  Color = JSON.parse(_Color);
});

port.on('error', function(err) {
  console.log('Error: ', err.message);
})