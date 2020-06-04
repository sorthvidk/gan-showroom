
export default function(array, prop1, prop2) {
	//sorts first prop desc, second prop asc!

	array.sort(function (a, b) {
	    var aProp1 = a[prop1];
	    var bProp1 = b[prop1];
	    var aProp2 = a[prop2];
	    var bProp2 = b[prop2];
	    
	    if(aProp1 == bProp1){
	        return (aProp2 > bProp2) ? -1 : (aProp2 < bProp2) ? 1 : 0;
	    } else {
	        return (aProp1 < bProp1) ? -1 : 1;
	    }
	});

	return array;
}