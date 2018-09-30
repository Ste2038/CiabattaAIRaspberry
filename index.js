var socket = require('socket.io-client')('https://ciabattaaiheroku.herokuapp.com/');
var SerialPort = require('serialport');
var fs = require('fs');
var TelegramBot = require('node-telegram-bot-api');
var Constants = require('./My files/constants');

const option = {mode: 0o600};

const token = Constants.BotToken;
const bot = new TelegramBot(token, {polling: true});

var port = new SerialPort(Constants.ComName, {
  baudRate: Constants.ComBound
});

let AutorizedId = [];
const ExStrategyBotDataPath = "./My files/ExtrategyBotData.json";
const credenziali = {};
credenziali[Constants.HeadersKey] = Constants.HeadersValue;
const MasterID = Constants.AutorizedMasterID;
let ActTodo,
    ActRele_Number,
    ActNumber,
    ActName;
let SerAvailable = true;

socket.on('Rele_Number', function(_Rele_Number){
  console.log('Rele_Number: ' + _Rele_Number);
  ActRele_Number = JSON.parse(_Rele_Number);
});

socket.on('Number', function(_Number){
  console.log('Number: ' + _Number);
  ActNumber = JSON.parse(_Number);
});

socket.on('Name', function(_Name){
  console.log('Name: ' + JSON.parse(_Name));
  ActName = JSON.parse(_Name);
});

socket.on('ToDo', function(_ToDo){
  console.log('Todo: ' + _ToDo);
  ActTodo = _ToDo;

  for (let i = 0; i < ActRele_Number.Lenght; i++){
    console.log("a");
  }
  
  switch (ActName){
    case 'Rele':
      for (let i = 0; i < ActRele_Number.Lenght; i++){
        switch (ActRele_Number[i]){
          case '1':
            if(SerAvailable){
              port.write('a', function(err) {
                if (err) {
                  return console.log('Error on write: ', err.message);
                }
                console.log('Rele 1');
              });
            }
          break;

          case '2':
            if(SerAvailable){
              port.write('b', function(err) {
                if (err) {
                  return console.log('Error on write: ', err.message);
                }
                console.log('Rele 2');
              });
            }
          break;

          case '3':
            if(SerAvailable){
              port.write('c', function(err) {
                if (err) {
                  return console.log('Error on write: ', err.message);
                }
                console.log('Rele 3');
              });
            }
          break;
          
          case '4':
            if(SerAvailable){
              port.write('d', function(err) {
                if (err) {
                  return console.log('Error on write: ', err.message);
                }
                console.log('Rele 4');
              });
            }
          break;

          case '5':
            if(SerAvailable){
              port.write('e', function(err) {
                if (err) {
                  return console.log('Error on write: ', err.message);
                }
                console.log('Rele 5');
              });
            }
          break;

          case '6':
            if(SerAvailable){
              port.write('f', function(err) {
                if (err) {
                  return console.log('Error on write: ', err.message);
                }
                console.log('Rele 6');
              });
            }
          break;

          case '7':
            if(SerAvailable){
              port.write('g', function(err) {
                if (err) {
                  return console.log('Error on write: ', err.message);
                }
                console.log('Rele 7');
              });
            }
          break;

          case '8':
            if(SerAvailable){
              port.write('h', function(err) {
                if (err) {
                  return console.log('Error on write: ', err.message);
                }
                console.log('Rele 8');
              });
            }
          break;
        }
      }
      

      switch(ActNumber){
        case "tutti":
          if(SerAvailable){
            port.write('abcd', function(err) {
              if (err) {
                return console.log('Error on write: ', err.message);
              }
              console.log('Tutti Rele');
            });
          }
        break;
      }
      
      console.log(ActNumber);
    break;

    case 'Monitor':
      switch(ActRele_Number[0]){
        case '1':
          if(SerAvailable){
            port.write('c', function(err) {
              if (err) {
                return console.log('Error on write: ', err.message);
              }
              console.log('Rele 3');
            });
          }
        break;

        case '2':
          if(SerAvailable){
            port.write('b', function(err) {
              if (err) {
                return console.log('Error on write: ', err.message);
              }
              console.log('Rele 2');
            });
          }
        break;

        default:
          if(SerAvailable){
            port.write('bc', function(err) {
              if (err) {
                return console.log('Error on write: ', err.message);
              }
              console.log('Rele 2 e 3');
            });
          }
        break;
      }
    break;

    case 'Stereo':
      if(SerAvailable){
        port.write('d', function(err) {
          if (err) {
            return console.log('Error on write: ', err.message);
          }
          console.log('Rele 4');
        });
      }
    break;

    case 'Led':
      if(SerAvailable){
        port.write('a', function(err) {
          if (err) {
            return console.log('Error on write: ', err.message);
          }
          console.log('Rele 1');
        });
      }
    break;
  }
});

port.on('error', function(err) {
  console.log('Error: ', err.message);
})