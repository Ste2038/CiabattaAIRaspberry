var socket = require('socket.io-client')('https://socketdialogflow.herokuapp.com/');
var SerialPort = require('serialport');
/*var port = new SerialPort('COM3', {
  baudRate: 9600
});*/
var fs = require('fs');
var TelegramBot = require('node-telegram-bot-api');
var Constants = require('./My files/constants');

const option = {mode: 0o600};
/*
const token = Constants.Token;
const bot = new TelegramBot(token, {polling: true});
*/
let AutorizedId = [];
const ExStrategyBotDataPath = "ExtrategyBotData.json";
const credenziali = {};
credenziali[Constants.HeadersKey] = Constants.HeadersValue;
const MasterID = Constants.AutorizedMasterID;

AutorizedId [0, 1] = "ciao";
AutorizedId [1, 0] = "no";
console.log(AutorizedId);
