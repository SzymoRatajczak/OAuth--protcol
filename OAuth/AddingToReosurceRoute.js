//Adding authorization request to one of our routes

var express=require('express');
var router=express.Router;
var authorize=require('../lib/middelware/Authorize');


router.get('/user',authorize,function(req,res,next)
{
	var user=
	{
		name:'Szymon Ratajczak',
		country:'Poland'
		
	}
	res.json(user);
	
});
module.export=router;
