'use strict';

//ListMovies/index.js (Runtime=Node.js 6.10, Hundler=index.readAllMovies)

var AWS = require('aws-sdk'),
	documentClient = new AWS.DynamoDB.DocumentClient(); 

exports.readAllMovies = function(event, context, callback){
	var params = {
		TableName : process.env.TABLE_NAME
	};
	documentClient.scan(params, function(err, data){
		if(err){
		    callback(err, null);
		}else{
		    callback(null, data.Items);
		}
	});
}
