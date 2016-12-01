let areaModule=require("../module/areaModule.js").areaModule;
let config=require("../config/config.js");
exports.getArea= (req, res)=>{
	if(req.method=="POST"){
		let instance=new areaModule();
		console.log(instance);
		instance.findAllArea(function(err,result){			
			if(!err){
				res.json({errcode:config.errcode.success,data:result});
			}else{
				res.json({errcode:config.errcode.unkwon,data:[]});
			}
		});
	}
}
exports.getType= (req, res)=>{
	console.log("getType");
	if(req.method=="POST"){
		let instance=new areaModule();
		console.log(instance);
		instance.findAllType(function(err,result){			
			if(!err){
				res.json({errcode:config.errcode.success,data:result});
			}else{
				res.json({errcode:config.errcode.unkwon,data:[]});
			}
		});
	}
}
