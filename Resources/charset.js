function getCharcode(s,debug){

	if (!debug){
		var codes = [];
	}else{
		var codes = "";
	}

	for (var i=0;i<s.length;i++){
		if (!debug){
			codes.push(s.charCodeAt(i));
		}else{
			codes +=s.charCodeAt(i) + ";";
		}
	}
	return codes;
}