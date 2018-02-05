//creating and storing token  in Mongodb

var uuid=require('node-uuid');
var mongoose=require('mongoose');

var TokenModel=function(
{
	var token=mongoose.Schema({
		
		userId:{type:String},
		refreshToken:{type:String,unique:true},
		accessToken={type:String, default:uuid.v4()},
		expiresIn:{type:String, default:'10800'},
		tokenType:{type:String, default:'bearer'},
		consumed:{type:Boolean,default:false},
		createdAt:{type:Date,default:Date.now,expires:'3m'}
		
		
	});
	
	return mongoose.model('Token',token);
	
});


module.export=new TokenModel();