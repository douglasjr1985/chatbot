/*-----------------------------------------------------------------------------
A simple "Hello World" bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
//var builder = require('../../core/');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================


  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: "0223da35-1906-41ae-867e-5d5aed8f1003",
    appPassword: "HqPriUid8XLBqDvvRwkcJ7k"
});
var bot = new builder.UniversalBot(connector);


//=========================================================
// Bots Dialogs
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', connector.listen());
server.port = process.env.port || process.env.PORT || 80;
server.host = process.env.port || '0.0.0.0';
server.listen(server.port,server.host, function () {
       console.log('%s FDICbotmbf listening to %s', server.name, server.url);
});

bot.dialog('/', function (session) {
    session.send("Hello World");
});

server.get('/', restify.serveStatic({
    directory: __dirname,
    default: '/index.html'
}));
