//beceause MongoDb and mongoose don't provide us with  feedback 
//and we must be sure whether error occured or not 
//we must implement feedback mechanism

router.get('/', function(req,res,next)
{
	var client=new Client(
	{
	name:'Test',
	userId:1,
	redirectUri:'http://localhost:5000/callback'
	});
	
	client.save(function(err)
	{
		if(err)
		{
			next(new Error('Client name exists already '));
		}
		else{
			res.json(client);
		}
		
		
	});
	
		
		

	
})