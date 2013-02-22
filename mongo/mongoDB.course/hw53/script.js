
use grades

db.grades.aggregate( [ 

	/* first deserialize the array with the scores*/
	{$unwind:"$scores"}, 

	/* now a project for a better managment of the scores and types out of the nexted dict*/

	{$project: { class: "$class_id", student:"$student_id", type:"$scores.type", score: "$scores.score"}}, 

	/* filter by the types that we need*/

	{$match: { $or: [ {type:"homework"}, {type:"exam"}]}}, 

	/* group by class and students and made the avg*/
	{$group: {_id: { class:"$class", student:"$student"}, avg:{$avg:"$score"}}}, 

	/* group by class to have the class avg*/
	{$group: {_id:"$_id.class", avg:{$avg:"$avg"}}}, {
	$sort: { avg:1}} 
] )

