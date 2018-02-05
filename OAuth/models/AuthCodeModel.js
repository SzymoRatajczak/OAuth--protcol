// Elements of authorization code 
var mongoose=require('mongoose');
var uuid=require('node-uuid');

var AuthCode=function(
{
	// set  elements for authorization code 
	var authModel=mongoose.Schema(
	{
		code:{type:String, default:uuid.v4()},
		CreatedAt:{type:Date, default.Date.now ,expires:'10m'},
		consumed:{type:Boolean, default:false},
		clientId:{type:String},
		userId:{type:String},
		redirectUri:{type:String}
		
	});
	
	return mongoose.model('AuthCode',authModel);
});

module.export=new AuthCode();