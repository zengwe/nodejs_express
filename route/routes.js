let index=require('../controller/index');
let login=require("../controller/login");
let main=require("../controller/main");
let filter=require("../controller/filter");
function auth(req,res,next){
	console.log(req.session);
	if(req.session.userinfo){
		console.log("is logined");
		next();
	}else{
		console.log("not login");
		res.redirect('/api/login');
	}
};
function test(req,res,next){
	console.log("test auth");
	console.log(req.session);
	if(req.session.userinfo){
		console.log("sesstion is found");
	}else{
		console.log("session is not found");
		req.session.userinfo="zengw test"
	}
	next();
}
module.exports=function(app){
	app.all("/api/login",login.login);
	app.all("/api/rejister",login.register);		
	app.all("/api/index",auth,index.index);
	app.all("/api/test",test,login.test);
	app.all("/api/code",login.code);
	app.all("/api/home",auth,main.home);
	app.all("/api/getarea",auth,filter.getArea);
	app.all("/api/getType",auth,filter.getType);
	//空方法
	app.all("*",function(req,res){
		res.send("page not found!!!");
	});
}
