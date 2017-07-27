 // This loads the environment variables from the .env file
require('dotenv-extended').load();

var restify = require('restify');
var builder = require('botbuilder');


//=========================================================
// Bot Setup
//=========================================================
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 5000, function () {
   console.log('%s listening to %s', server.name, server.url);
});
// Create chat bot
var connector = new builder.ChatConnector({
      appId: "0223da35-1906-41ae-867e-5d5aed8f1003",
    appPassword: "HqPriUid8XLBqDvvRwkcJ7k"
});
var bot = new builder.UniversalBot(connector);

server.post('/api/messages', connector.listen());
//Bot on
bot.on('contactRelationUpdate', function (message) {
    if (message.action === 'add') {
        var name = message.user ? message.user.name : null;
        var reply = new builder.Message()
                .address(message.address)
                .text("Hello %s... Thanks for adding me. Say 'hello' to see some great demos.", name || 'there');
        bot.send(reply);
    } else {
        // delete their data
    }
});
bot.on('typing', function (message) {
  // User is typing
});
bot.on('deleteUserData', function (message) {
    // User asked to delete their data
});
//=========================================================
// Bots Dialogs
//=========================================================
String.prototype.contains = function(content){
  return this.indexOf(content) !== -1;
}

bot.dialog('/', function (session) {
    if(session.message.text.toLowerCase().contains('oi')){
      session.send('Hey, How are you?');
      }else if(session.message.text.toLowerCase().contains('bom dia')){
        session.send('Bom dia');
      }else if(session.message.text.toLowerCase().contains('help1')){
        session.send('How can I help you?');
      }
      
      else{
        session.send('000Sorry I don understand you...');
      }
});



