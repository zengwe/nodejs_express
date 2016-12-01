let baseModule = require('../driver/mysql2.js').mysql;
var async = require("async");
const perCount=10;
function homeModule(){
	//baseModule.call(this);
}
//homeModule.prototype=new baseModule();
homeModule.prototype.findContentList=function(where,order,page,callback){
	var contentInstance=new baseModule();
	contentInstance.table("hx_content")
		.where(where)
		.join("hx_user","hx_content.userid=hx_user.userId")
		.limit([(page-1)*perCount,page*perCount-1])
		.order(order)
		.selectTables(function(err,result,filed){
		if(err==null,result.length!=0){
			async.mapLimit(result,1,function(single_result,complete){
				let temp = new baseModule();
				temp.table("hx_media").where([{contentId:Array("=",single_result.contentId)}]).find(function(err,medias,filed){
					for(let i=0;i<result.length;i++){
						if(result[i].contentId==single_result.contentId){
							result[i].media=medias;
							break;
						}
					}
					complete(null,"");					
				});
			},function(){
				//清除掉个人信息
				for(item in result){
					delete result[item].password;
					delete result[item].phone;
				}				
				callback(err,result,filed);
			});			
		}else{
			callback(err,result,filed);
		}
	});
}
/*
* test
* desc 降序 asc 升序
*/
// var demo = new homeModule();
// demo.findContentList([{"hx_user.userid":Array("=","31")}],{time:"desc"},function(err,result,filed){
// 	console.log(err);
// 	console.log(result);
// });
exports.homeModule=homeModule;