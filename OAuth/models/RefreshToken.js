var uuid=require('node-uuid');
var mongoose=require('mongoose');

var RefreshToken=function(
{
	var refresh=mongoose.Schema(
	{
		userId:{type:String},
		token:{type:String, default:uuid.v4()},
		createdAt:{type:Date,default:Date.now},
		consumed:{type:Boolean,default:false},
		
		
		
	});
	return mongoose.model('RefreshToken',refresh);
	
});
module.export=new RefreshToken();