
//this utill module inherits all Error's methods and properties
var util=require('util');


//this method is extension of Error class and it's supposed to be used as error's handling mechanism 
//I extended built-in Error class in order to provide  more meaningful feedback to the client
function OAuthError(code,message,err)
{
	Error.call(this);
	Error.captureStackTree(this,this.constructor);
	
	if(err instanceof Error)
	{
		this.stack=err.stack;
		this.message=message || err.message;
	}
	else{
		
		this.message=message || ' ' ;
	}
	
	this.code=code;
	
	switch(code)
	{
		case 'unsupported_grant_type':
		{
			this.status:400;
			break;
		}
		
		case 'invalid_grant':
		{
			this.status:400;
			break;
		}
		case 'invalid_request':
		{
			this.status:400;
			break;
		}
		
		case 'invalid_client':
		{
			this.status:401;
			break;
		}
		
		case 'invalid_token':
		{
			this.status:401;
			break;
		}
		
		case 'server_error':
		{
			this.status:503;
			break;
		}
		
		default:
		{
		this.status:500;
       break;		
		}
		
		
	}
	return this;
}

util.inherits(OAuthError,Error);
module.export=new OAuthError();


//POST request doesn't have  access to the next parameter  so we must set up new handler
function handleError(err,res)
{
	//to be sure the fresheness of information provided
	res.set{'Cache-Control','no-store'};
	res.set{'Pragma','no-cache'};
	
	if(err.code==='invalid_client')
	{
		var header='Bearer realm="book", error="invalid_token",'+'error_description="No access token provided"';
		res.set('WWW-Authenticate,'header);
		
	}
	res.status(err.status).send({
		err:err.code,
		description:err.message
	});


	}
	module.export=new handleError();
