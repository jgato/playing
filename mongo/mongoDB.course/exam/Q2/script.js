//filtering by the possibles froms in the questionarie response alternatives is not
// very beatiful code. Otherwise I have seg falt because of memory
use enron

db.messages.aggregate( 
	{$match: { "headers.From": "soblander@carrfut.com"  }}, 
	{$project: { filename:1, from:"$headers.From", to:"$headers.To"}}, 
	{ $unwind:"$to"  } ,  
	{$group: { _id:"$filename", from: {$addToSet:"$from"}, to: {$addToSet:"$to"} }}, 
	{$unwind:"$from"}, {$unwind:"$to"}, 
	{$group: { _id: {from:"$from", to:"$to"}, count: {$sum:1}}}, 
	{$sort:{count:1}}
)

