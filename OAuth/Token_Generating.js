//Generating  both access and  refresh tokens

var uuid=require('node-uuid');
var Token=require('../lib/models/TokenModel');
var refreshToken=require('../lib/models/RefreshToken');

var userId=1;

var refreshToken=new RefreshToken(
{
	userId:userId
});

refreshToken.save();

var token=new Token(
{
	userId:userId,
	refreshToken:refreshToken.token
});
token.save();


