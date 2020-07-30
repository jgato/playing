

use zips

db.zips.aggregate([  
	/* just to know the command substr */   
	{$project:       { first_char: {$substr : ["$city",0,1]}, city:"$city", pop:"$pop", state:"$state"     }     }, 
	/* a regular expression and thats all */
	{$match: { first_char: { $regex: /^[0-9]/ } }}, 
	{$group: {_id:0, sum: {$sum:"$pop"}}} 
])

