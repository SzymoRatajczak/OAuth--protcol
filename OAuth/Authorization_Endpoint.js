//Authorization code is used with redirection-based authorization flow ,
//when you are redirected to service provider in order to get access token 
//you need authorization code  (this relation is like: authorization code is like money, necessary to buy access token
// and service provider's token endpoint is like  a shop where you can  make deal)

//Authorization code requires two endpoints ( here: you and service provider  in other words: 
// you - customer,  authorization code- money,  service provider- shopper)

//following code assumes there is mongoose called client model
// a client consists a ID,secret and a few more attributes in order to communicate with consumer
var uuid=require('node-uuid');
var Client=require('../lib/models/ClientModel');
var AuthCode=require('../lib/models/AuthCodeModel');


//first prameter - client's credentialls will be passed to MongoDb in authorization route
router.get('/authorize',function(req,res,next)
{
	//scope tells Service provider what kind of attributtes consumer is allowed to access
	//redirect_uri- it uses in order to communicate with costumer
	
	
	//client side OAuth 2.0 requests
	var responseType=req.query.response_type;
	var clientId=req.query.client_id;
	var redirectUri=req.query.redirect_uri;//after Service Provider autohrizes  our client, it redirects to specified  redirectUri and provides state query parameter
	var scope=req.query.scope;//without OpenID standard it's optional parameter, everything changes when we want to use OpenID as authentication and authorization freamwork
	var state=req.query.state;//Providing after authorizaion of user
	
	
	if(!responseType)
	{
			 return errorHandler(new OAuthError('invalid_request','missing parameter ',res));	
	}
	
	if(responseType!='code')
	{
		 return errorHandler(new OAuthError('invalid_request','unsupported type ',res));
	}
	
	if(!clientId)
	{
		 return errorHandler(new OAuthError('invalid_request','missing parameter ',res));	
	}
	
	
	Client.findOne(
	{
		clientId:clientId
	},   
	function(err,client)
	{
		if(err)
		{
			//handle the error by passing it to the middelware
			next(err);
		}
		
		if(!client)
		{
			 return errorHandler(new OAuthError('invalid_request','missing parameter ',res));	
		}
		if(redirectUri!==client.redirectUri)
		{
			 return errorHandler(new OAuthError('invalid_request','missing parameter ',res));	
		}
		
		if(scope!==client.scope)
		{
			//handle the scope
		}
		
		var authcode=new AuthCode(
		{
			clientId:clientId,
			userId:client.userId,
			redirectUri:redirectUri
			
		});
		authcode.save();
		
		var response=
		{
			state:state,
			code:authcode.code
		};
		
		if(redirectUri)
		{
var redirect=redirectUri+'?code='+response.code+(state===undefined ? ' ' : '&state=' +state);
res.redirect(redirect);

		}	
		else{
			
			
			res.json(response);
		
		
	}
	
	

	
	//scope.indexOf(openid) is a minima scope defined by OpenID's sepcification
	if(!scope ||scope.indexOf('openid')<0)
	{
		next( new OAuthError('invalid_scope','Scope is missing or not well defined'));
	}
	Client.findOne(
	{
		clientId:clientId
	},function(err,client)
	{
		
		if(err)
		{
		 	 return errorHandler(new OAuthError('invalid_request','missing parameter ',res));	
		}
		
		if(!client)
		{
	 return errorHandler(new OAuthError('invalid_request','missing parameter ',res));	
		}
		
		if(scope!==client.scope)
		{
			next(new OAuthError('invlaid_scope','Scope is missing or not well defined'));
		}
		
		//basic assumption that each request to endpoint is OpenID aut request
		
		if(scope && scope.indexOf('openid')>=0 )
		{
			//OpenId connect authentication  request-genrate ID token
		}
	});
	
});

});