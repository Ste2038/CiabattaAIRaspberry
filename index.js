import { constants } from 'perf_hooks';

var socket = require('socket.io-client')('https://socketdialogflow.herokuapp.com/');
var SerialPort = require('serialport');

var fs = require('fs');
var TelegramBot = require('node-telegram-bot-api');
var Constants = require('./My files/constants');

const option = {mode: 0o600};
/*
const token = Constants.Token;
const bot = new TelegramBot(token, {polling: true});
*/
var port = new SerialPort(Constants.ComName, {
  baudRate: Constants.ComBound
});

let AutorizedId = [];
const ExStrategyBotDataPath = "./My files/ExtrategyBotData.json";
const credenziali = {};
credenziali[Constants.HeadersKey] = Constants.HeadersValue;
const MasterID = Constants.AutorizedMasterID;
