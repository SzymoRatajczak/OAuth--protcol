//implementation of token endpoint- one of ends in whole relation 

//it issues the access token in exechange for authorization code 
// in other words:  here is place where you as  a customer  can buy access token


//here we also  create refresh token 
//Refresh token is responsible for generating access token 

//Whole realation in other words: you-customer,  authorization code- money ,  token endpoint-shop
//access token- product ,  refresh token-shopper
 
var AuthCode=require('../lib/model/AuthCodeModel');
var Client=require('..lib/models/ClientModel');
var Token=require('../lib/models/TokenModel');
var RefreshToken=require('../lib/models/RefreshToken');


router.post('/token',function(req,res,next)
{
	var grantType=req.body.grant_type;
	var authCode=req.body.code;
	var redirectUri=req.body.redirect_uri;
	var clientId=req.body.clientid;
	
	
	//in other words- you have no money ( authorization code) 
	if(!grantType)
	{
		 return errorHandler(new OAuthError('invalid_request','missing parameter: grant_type',res));
	}
	
	//you have money
	if(grantType==='authorizationCode')
	{
		AuthCodeModel.findOne(
		{
			code:authCode
		},function(err,code)
		{
			if(err)
			{
				//handle the error
			}
			if(!code)
			{
				
				//no valid authorization code provided-cancel
			}
			if(code.consumed)
			{
				//code has alredy consumed-cancel
			}
			
			
			code.consumed=true;
			code.save();
			
			
			if(code.redirectUri!==redirectUri)
			{
				//cancel
			}
			
			
			Client.findOne(
			{
				clientId:clientId
			},function(err,Client)
			{
				if(err)
				{
					//the client's id was mismatched or doesn't exist-cancel
				}
				
				if(!Client)
				{
					//the client's id was mismatched or doesn't exist-cancel
				}
				
				var _refreshToken=new RefreshToken(
				{
					userId:code.userId
				});
				_refreshToken.save();
				
				var _token=new Token(
				{
					userId=code.userId;
					refreshToken=_refreshToken.token,
				});
				_token.save();
				
				//send the new token to the consumer
				var response=
				{
					access_token:_token.accessToken
					refresh_token:_token.refreshToken
					expires_in:_token.expiresIn
					token_type:_token.tokenType
				};
				res.json(response);
			
	 
			//if we use OpenID along OAuth 2.0 we muest add scope 
			//parameter to list of requests of  OAuth 2.0 ( in Authorization_Endpoint file)
			//Along with OpenID  we generate ID token  which can be used as additional security mechanism
		
			if(client.scope && client.scope.indexOf('openid')>=0)
			{
				//an OpenID connect request
				var _idToken=new Id_Token({
					
					iss:client.redirectUri,
					aud:client.clientId,
					userId:code.userId
				});
				_idToken.save();
				
				_token=new Token(
				{
					refreshToken:refreshToken.token,
					userId:code.userId,
					idToken=_idToken.sub
					
				});
				
				_token.save();
				
				
				//send token to the cosnumer
				var response=
				{
					access_token:_token.accessToken,
					refreshToken:_token.refreshToken,
					idToken=_idToken.sub,
					expires_in:_token.expiresIn,
					tokenType=_token.tokenType,
					
				};
				res.json(response);
				
			}
			else{
				
				//an OAuth2 request
				_token=new Token({
					refreshToken=_refreshToken.token,
					userId:code.userId
					
				});
				_token.save();
				
				//send token to the consumer
				var response=
				{
					accessToken:_token.accessToken,
					refreshToken:_token.refreshToken,
					expiresIn:_token.expiresIn,
					tokenType=_token.tokenType,
				};
				res.json(response);
			}
			});
			
		});
		
		
	}
	else if( grandType==='refresh_token')
	{
		if(!refreshToken)
		{
		//	no refresh token porvided-cancel
		}
		
		RefreshToken.findOne(
		{
			token:refreshToken
		},function(err,token)
		{
			
			if(err)
			{
				//error
			}
			
			if(!token)
			{
				//no refresh token found
			}
			
			if(token.consumed)
			{
				//token got consumed already
			}
			
			//consume all previous refresh token
			RefreshToken.Update(
			{
				userId:token.userId,
				consumed:false
				
			}
			{
				$set:{consumed:true}
			});
			var _refreshToken=new RefreshToken(
			{
				userId:token.userId
			});
			_refreshToken.save();
			
			var _token=new Token(
			{
				refreshToken:_refreshToken.token(),
				userId:token.userId
			});
			_token.save();
			
			var response=
			{
				access_token:_token.accessToken,
				refreshToken:_token.refreshToken,
				expires_in:_token.expiresIn,
				token_type:_token.tokenType,
			};
			
			//send new token to the consumer
			res.json(response);
			
			
			
			
			
		});
		
	}
	
	
});
