let homeModule=require("../module/homeModule.js").homeModule;
let config=require("../config/config.js");
exports.home= (req, res)=>{
	console.log(req.session);
	/*
		@param startTime timestram
		@param endTime timestram
		@param type int
		@param orderby int (0:最新,1:最热)
		@param page (default "")
		@param area (default "")
		@param page (default 1)
	*/
	if(req.method=="POST"){
		//获取参数
		let getParam=req.body;
		console.log("condition");
		console.log(getParam)
		let where=Array();
		let order={};
		if(getParam.startTime){
			where.push({
				time:Array(">",new Date(getParam.startTime).getTime())
			});
		}
		if(getParam.endTime){
			where.push({
				time:Array("<",new Date(getParam.endTime).getTime())
			});
		}
		if(getParam.orderby==undefined|getParam.orderby==0){
			order={
				time:"DESC"				
			}
		}else{
			order={
				commentCount:"DESC"
			}
		}
		if(getParam.area&&getParam.area!="全国"){
			where.push({
				area:Array("=",getParam.area)
			});
		}
		if(getParam.type&&getParam.type!="全部"){
			where.push({
				eType:Array("=",getParam.type)
			});
		}		
		if(where.length>1){
			where.push("AND");
		}
		
		console.log(where);
		console.log(order);
		var demo = new homeModule();
		//let where=[{"hx_user.userid":Array("=","31")}];		
		demo.findContentList(where,order,getParam.page,function(err,result,filed){
			console.log(err);
			//console.log(result);
			res.json({errcode:config.errcode.succ,data:result});	
		});	
	}else{
		//console.log(req.query);
		/*
		1480550400000
		1479460206317
		1441065600000
		*/
		let getParam=req.query;
		let where=Array();
		let order={};
		if(getParam.startTime){
			where.push({
				time:Array(">",new Date(getParam.startTime).getTime())
			});
		}
		if(getParam.endTime){
			where.push({
				time:Array("<",new Date(getParam.endTime).getTime())
			});
		}
		if(getParam.orderby==undefined|getParam.orderby==0){
			order={
				time:"DESC"				
			}
		}else{
			order={
				commentCount:"DESC"
			}
		}
		if(getParam.area){
			where.push({
				area:Array("=",getParam.area)
			});
		}
		where.push("AND");
		console.log(where);
		console.log(order);
		var demo = new homeModule();
		//let where=[{"hx_user.userid":Array("=","31")}];		
		demo.findContentList(where,order,getParam.page,function(err,result,filed){
			console.log(err);
			//console.log(result);
			res.json({errcode:config.errcode.succ,data:result});	
		});			
	}

}