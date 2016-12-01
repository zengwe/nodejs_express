let baseModule = require('../driver/mysql2.js').mysql;
function areaModule(){

}
areaModule.prototype.findAllArea=function(callback){
	var contentInstance=new baseModule();
	contentInstance.excute("select contentId,group_concat(distinct area) as area from hx_content group by area;",function(err,result,filed){
		if(!err){
			callback(err,result);
		}
	});
}
areaModule.prototype.findAllType=function(callback){
	var contentInstance=new baseModule();
	contentInstance.excute("select contentId,group_concat(distinct eType) as area from hx_content group by eType;",function(err,result,filed){
		if(!err){
			callback(err,result);
		}
	});
}
exports.areaModule=areaModule;