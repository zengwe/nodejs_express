// let $ = require("./baseModule.js").sql;
let config=require("../config/config.js");
let user=(function(){
	let module = require('../driver/mysql.js').mysql;
	let instance=new module();
	const table="hx_user";
	return {
		findUser:function(obj,callback){
			this.where(obj);
			let filed=this.options.filedstr?this.options.filedstr:" * ";
			let where=this.options.where?"where "+this.options.where:"";
			let sql="select"+filed+" from "+table+" "+where+";";
			new module().query(sql,callback);
		},
		options:{
			filedstr:null,
			where:null
		},
		where:function(obj){
			let where="";
			if(obj instanceof Array){
				if(obj.length==1){
					for(let i=0;i<obj.length;i++){
						for(let item in obj[i]){
							where+=" "+item+" "+obj[i][item][0]+" '"+obj[i][item][1]+"' ";
						}
					}
				}else{
					let logical=obj[obj.length-1];
					for(let i=0;i<obj.length-1;i++){
						if(i!=0){
							where+=logical+" "
						}
						for(let item in obj[i]){
							where+=" '"+item+"' "+obj[i][item][0]+" '"+obj[i][item][1]+"' ";
						}
					}					
				}
				this.options.where=where;
			}else{
				return false;
			}
		},
		filed:function(str){
			this.options.filedstr=" "+str+" ";
			return this;
		},
		addUser:function(obj,callback){
			var _this=this;
			var promise=new Promise(function(resolve, reject){
				_this.findUser([{phone:Array("=",obj.phone)}],function(err,result,fileds){
					if(err==null){
						resolve({errcode:config.errcode.success,data:result});
					}else{
						reject({errcode:config.errcode.unknow,data:err});
					}
				});
			});
			promise.then(function(succ){
				console.log(succ);
				if(succ.data.length==0){
					_this.insert(obj,"hx_user",callback);
				}else{
					callback({errcode:config.errcode.existing,data:{}});
				}
			},function(err){
				callback(err);
			});
		},
		insert:function(data,table,callback){
			let row=[],val=[];
			for(item in data){
				if(data[item]!=""){
					row.push(item);
					if(Object.prototype.toString.call(data[item])=="[object String]"){
						val.push("'"+data[item]+"'")
					}else if(Object.prototype.toString.call(data[item])=="[object Number]"){
						val.push(data[item]);
					}else{
						console.log(Object.prototype.toString.call(data[item]));
						try {
							row.pop();
						} catch(e) {
							console.log(e);
						}						
					}
				}
			}
			let sql="insert into "+table+"("+row.join(",")+") "+"VALUES("+val.join(",")+");";
			new module().query(sql,function(err,result,fileds){				
				if(err==null){
					callback({errcode:config.errcode.success,data:result});
				}else{
					callback({errcode:config.errcode.unknow,data:err});
				}
			});
		}
	}
})();
exports.user=user;