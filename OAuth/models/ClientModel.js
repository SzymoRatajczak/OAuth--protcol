//Client's ID ,secret must be uniqe to avoid any issues
//that's why i am using  unique  mechanism to avoid any issues 

var mongoose=require('moongose');
var  uuid=require('node-uuid');

var ClientModel=function()
{
	//owing this we don't have to pass client's id whenever we create a client
	//uuid.v4() - generetes random value
	//here i set keys 
	var clientScheme=mongoose.Schema(
	{
		clientId:{type:String,default:uuid.v4(),unique:true},
		clientSecret:{type:String,default:uuid.v4(),unique:true},
		createdDate:{type:Date,default.Date.now},
		name:{type:String,unique:true},
		scope:{type:String},
		userId:{type:String},
		redirectUri:{type:String}
		
		
	});
	
	return mongoose.model('ClientModel',clientScheme);
	
};

module.export=new  ClientModel();


