//This method makes for convenient middelware that protects our application's resources
//Authorization request's using authorization middelware
var Token=require('../models/TokenModel');
var OAuthError=require('../lib/errors/oautherror');
var errorHandler=require('../lib/errors/Error_handling');







var authorize=function(req,res,next)
{
	var accessToken;
	
	if(req.headers.authorization)
	{
		var parts=req.headers.authorization.parts(' ');
		
		if(parts.length<2)
		{
			//no accessToken got provided-cancel
			res.set('WWW-Authenticate','Bearer');
			res.sendStatus('401');
			return;
			
		}
		
		accessToken=parts[1];
		
		
		
	}
	else{
		//access token uri query parameter or entire body
		accessToken=req.query.access_token || req.body.access_token;
		
	}
	
	if(!accessToken)
	{
		//no access token got provided-cancel with 401
		 return errorHandler(new OAuthError('invalid_request','missing parameter ',res));	
	}
	
	Token.findOne(
	{
		accessToken:accessToken;
		
	},function(err,token)
	{
		
		if(err)
	{
//handle error
	 return errorHandler(new OAuthError('invalid_request','missing parameter ',res));	
	}
	
	
	if(!token)
	{
		//no token found-cancel
		 return errorHandler(new OAuthError('invalid_request','missing parameter ',res));	
	}
	
	if(token.consumed)
	{
		//token has got  consumed already-cancel
		 return errorHandler(new OAuthError('invalid_request','missing parameter ',res));	
	}
	
	
	//consume all tokens -including the one used
	Token.Update({
		consumed:false,
		userId:token.userId
		
	},
	{
		
		$set:{consumed:true}
	});
	

	next();
	// after the authorization middelware has processed , the request is passed onto the next middelware
	});
	
};
module.export=authorize;

 