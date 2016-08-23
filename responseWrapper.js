exports.process = function(request, response) {
	response.send('Entered here: ' + request.params.id);
	recipientJSON = getRecipientJSON();
	console.log(recipientJSON);
}

exports.serveFile = function (request, response) {
  var options = {
    root: __dirname + '/files/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = 'document.odt';
  response.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      response.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
}

function getRecipientJSON() {
	var recipientJSON = require('./recipient.json');
	// recipientJSON.rid, recipientJSON.file

	return recipientJSON;
}