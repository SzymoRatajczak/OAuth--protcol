//Whenever resource is accessed using Access Token, the token needs to be consumed in order to
//make sure no more resource requests are made using this token
 var Token=require('../lib/models/TokenModel');
 var accessToken='some uuid';
 
 Token.findOne(
 {
	 accessToken:accessToken
	 
 }, function(err,token)
 {
	 
	if(err)
	{
//handle error

	}
	
	
	if(!token)
	{
		//no token found-cancel
	}
	
	if(token.consumed)
	{
		//token has got  consumed already-cancel
	}
	
	//consume all tokens -including the one used
	Token.Update(
	{
		token:token.userId,
		consumed:false
	},
	{
		$set:{consumed:true}
		
	});
	
	
	
	
 });
 
 
 