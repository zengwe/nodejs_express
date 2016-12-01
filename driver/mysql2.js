var config = require('../config/config.js');
var mysqlpackage = require('mysql');
exports.mysql=(function(){
	function mysql(table,db){
		this.mysqlstr={
			filed:"",
			where:"",
			limit:"",
			table:"",
			order:"",
			join:""
		};
		this.instancce=null;
		return this;
	}
	mysql.prototype={
		init:function(){
			this.config={
				host:config.db.host,
				user:config.db.username,
				password:config.db.password,
				port:config.db.port,
				database:config.db.database
			};
			var _this=this;
			var conn = mysqlpackage.createConnection(this.config);	
			conn.connect(function(err){
				if(err!=null){
					console.log("mysql connect error!!!");
				}
			});		
			_this.sqlInstance=conn;
		},
		table:function(table){
			this.mysqlstr.table=table;
			return this;
		},
		select:function(){
			return this;
		},
		updata:function(){
			return this;
		},
		insert:function(){
			return this;
		},
		insertAll:function(){
			return this;
		},
		order:function(obj){
			if(Object.prototype.toString.call(obj)=="[object Object]"){
				let arr_temp=Array();
				for(let item in obj){
					arr_temp.push(item+" "+obj[item]);
				}
				this.mysqlstr.order=arr_temp.join(",");
			}
			return this;
		},
		find:function(callback){
			if(this.mysqlstr.table==""){
				console.log("not defind table!!!");
				return this;
			}			
			let sql="select ";
			sql+=this.mysqlstr.filed?this.mysqlstr.filed+"":"* ";
			sql+=" from "+this.mysqlstr.table;
			sql+=this.mysqlstr.where?" where"+this.mysqlstr.where:"";
			sql+=this.mysqlstr.order?" order by "+this.mysqlstr.order:"";
			sql+=this.mysqlstr.limit?" limit "+this.mysqlstr.limit+";":";";
			console.log(sql);
			this.excute(sql,callback);
			return this;
		},
		limit:function(arr){
			if(arr.length==2){
				this.mysqlstr.limit=arr.join(",");
			}else{
				this.mysqlstr.limit=arr[0];
				return this;
			}
			return this;
		},
		join:function(table,on){
			this.mysqlstr.join=" join "+table+" on "+on;
			return this;
		},
		selectTables:function(callback){
			if(this.mysqlstr.table==""){
				console.log("not defind table!!!");
				return this;
			}			
			let sql="select ";
			sql+=this.mysqlstr.filed?this.mysqlstr.filed+"":"* ";
			sql+=" from "+this.mysqlstr.table;
			sql+=this.mysqlstr.join;
			sql+=this.mysqlstr.where?" where"+this.mysqlstr.where:"";
			sql+=this.mysqlstr.order?" order by "+this.mysqlstr.order:"";
			sql+=this.mysqlstr.limit?" limit "+this.mysqlstr.limit+";":";";
			console.log(sql);
			this.excute(sql,callback);
		},
		filed:function(filedArr){
			if(Object.prototype.toString.call(filedArr)=="[object Array]"){
				for(item in filedArr){
					filedArr[item]="'"+filedArr[item]+"'"
				}
				this.mysqlstr.filed=filedArr[item].join(",");
			}else if(Object.prototype.toString.call(filedArr)=="[object String]"){
				if(filedArr==""){
					this.mysqlstr.filed="*";
				}else{
					this.mysqlstr.filed=filedArr;
				}
			}
			return this;
		},
		where:function(obj){
			let where="";
			//if(obj instanceof Array){
			if(Object.prototype.toString.call(obj)=='[object Array]'){
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
							where+=" "+item+" "+obj[i][item][0]+" '"+obj[i][item][1]+"' ";
						}
					}					
				}
				this.mysqlstr.where=where;
			}else if(Object.prototype.toString.call(obj)=='[object Object]'){
				//for(let item in obj)
				//return false;
			}
			return this;
		},
		parseSql:function(){
			
		},
		query:function(str,callback){
			var _this=this;
			_this.excute(str,callback);
		},
		excute:function(str,callback){
			this.init();
			console.log(str);
			var _this=this;
			if(str!=""){
				_this.sqlInstance.query(str,function(err, results, fields){
					console.log("执行成功");
					callback(err,results,fields);
					_this.free();
				});
			}
		},
		free:function(){
			let _this=this;
			for(let item in this.mysqlstr){
				this.mysqlstr[item]="";
			}
			_this.sqlInstance.end();
		}
	}
	/*
	*@title test
	*date 20161108
	*author zengw
	*/
	// var demo=new mysql()
	// //.query("select * form hx_user");
	// demo.query("select * from hx_user",function(err,results,fileds){
	// 	console.log(results);
	// });

	// let where=[{username:Array("=","zeng")},{password:Array("=","123456")},"AND"];
	// var demo=new mysql();
	// demo.table("hx_user").where(where).limit([1]).find(function(err,results,fields){
	// 	console.log(err);
	// 	console.log(results);
	// });
	// var demo2=new mysql();	
	// demo2.table("hx_user").limit([1,2]).find(function(err,results,fields){
	// 	console.log(err);
	// 	console.log(results);
	// });
	// var demo3=new mysql();
	// demo3.table("hx_user").filed("username,password").order({username:"desc",password:"desc"}).find(function(err,results,fields){
	// 	console.log(results);
	// });
	// var demo4=new mysql();
	// demo4.table("hx_content").join("hx_user","hx_content.userid=hx_user.userId").selectTables(function(err,result,filed){
	// 	console.log(result);
	// });
	return mysql;
})();