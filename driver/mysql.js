var config = require('../config/config.js');
var mysqlpackage = require('mysql');
exports.mysql=(function(){
	function mysql(table,db){
		this.mysqlstr={
			filed:"",
			where:"",
			limit:""
		}
		return this;
	}
	mysql.prototype={
		sqlIntance:null,
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
		table:function(){
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
		find:function(){

			return this;
		},
		filed:function(filedArr){
			for(item in filedArr){
				filedArr[item]="'"+filedArr[item]+"'"
			}
			this.mysqlstr.filed=filedArr[item].join(",")
			return this;
		},
		where:function(arr){
			if((arr instanceof Object)){

			}
			this.mysqlstr="";
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
					callback(err,results,fields);
					_this.sqlInstance.end();
				});
			}
		},
		free:function(){

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
	return mysql;
})()