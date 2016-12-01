var config=require("../config/config.js");
var $ = require("../module/userModule.js").user;
var func = require("../public/function.js").func;
let where=[{username:Array("=","zeng")},{password:Array("=","123456")},"AND"];
// $.filed("username").findUser([],function(err,results,fileds){
// 	console.log(results);
// })
exports.login= (req, res) => {
	console.log(req.session);
	if(req.method==config.method.POST){
		console.log("login");
		let username=req.body.username;
		let password=req.body.password;
		if(username!=""&&password!=""){
			$.findUser([{username:Array("=",username)}],function(err,result,fileds){
				console.log(result);
				if(err==null){
					if(result.length==0){
						res.json({errcode:config.errcode.nouser,data:{}});
					}else{
						if(result[0].password!=password){
							res.json({errcode:config.errcode.passworderr,data:{}});
						}else {
							//登陆成功
							req.session.userinfo={
								userid:result[0].id,
								username:result[0].username,
								photo:result[0].usericon
							}							
							res.json({errcode:config.errcode.loginsucc,data:result[0]});
							console.log("设置cookie");

						}
					}
				}else {
					res.json({errcode:config.errcode.unknow,data:{}});
				}
			});
		}else{		
			res.json({errcode:config.errcode.nothing,data:{}});
		}
	}else{
		req.session.name="test";
		res.json({errcode:config.errcode.methoderr,data:{}});
	}	
};
exports.register= (req, res) => {
	if(req.method==config.method.POST){
		var response={
			errcode:"",
			data:{}
		};
		console.log(req.body);
		console.log(req.cookies);
		req.body.phone=parseInt(req.body.phone);
		var ispass=true;
		if(req.cookies.code!=req.body.code){
			response.errcode=config.errcode.codeErr;
			ispass=false;
		}else if(!func.validata_phone(req.body.phone)){
			response.errcode=config.errcode.phoneErr;
			ispass=false;
		}else if(req.body.password.length<5){
			response.errcode=config.errcode.strNotLong;
			ispass=false;
		}else if(req.body.password!=req.body.repassword){
			response.errcode=config.errcode.strNeq;
			ispass=false;
		}
		if(ispass){
			$.addUser({phone:req.body.phone,password:req.body.password},function(obj){
				res.json({errcode:obj.errcode,data:{}});
			});			
		}else{
			res.json(response);			
		}

		
	}else{
		res.json({errcode:config.errcode.methoderr,data:{}});
	}	
};
exports.test=(req,res)=>{
	console.log("test page");
	res.render("index",{});
}
exports.code=(req,res)=>{
	let codenum=Math.floor(Math.random()*(9999-1000))+1000;
	res.cookie('code', codenum, { expires: new Date(Date.now() + 900000), httpOnly: true })
	//console.log(res.cookie);
	console.log(req.cookies);
	console.log("验证码为:"+codenum);
	res.json({errcode:config.errcode.success,data:{}});
}