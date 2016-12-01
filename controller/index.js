exports.index= (req, res) => {
	if(req.method=="GET"){
		console.log("indexpage");
		res.render("index",{});		
	}	
};