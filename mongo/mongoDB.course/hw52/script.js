/*

* Please calculate the average population of cities in California (abbreviation CA) and New York (NY) (taken together) with populations over 25,000.

* For this problem, assume that a city name that appears in more than one state represents two separate cities. 


* The first problem: in the same state you will finde more than one city
* with the same name but differnt zips codes. We have to sum
* all the zip codes of each city, before filtering for population 
* Also the same (name) city appears in different states, so we cannot simply
* group by cities. In this case are different cities which population 
* needs to be managed separatedly

*/


use zips 


db.zips.aggregate([
	/* first of all filter by states */
	{$match:{$or:[{state:"CA"},{state:"NY"}]}}, 

	/* we cannot simple group by city, because the same name could appear in different states */
	{$group: { _id: { city:"$city", state: "$state"}, pop: {$sum:"$pop"} }} , 

	/* now we have the total population of cities by state and can filter for pop*/
	{$match: {pop : {$gt:25000}}}, 

	/* each document is a different city, we can group them and avg */
	{$group: {_id:1, avg: {$avg:"$pop"}}} 
])
