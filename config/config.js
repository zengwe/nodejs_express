exports.method={
	POST:"POST"
}
exports.db={
	database:"hangxunserver",
	username:"root",
	password:"",
	options:{
		max:20,
		min:0,
		idle:10000
	},
	host:"127.0.0.1",
	port:"3306",
	dialect:"mysql",
	timezone:"+08:00",
	define:{
		freezeTableName:true,
		timestamps:false
	}
}
exports.redis={
	port:6379,
	host:"127.0.0.1"
}
exports.errcode={
	loginsucc:1,
	nouser:2,//用户不存在
	passworderr:3,
	loginsucc:4,
	nothing:5,
	methoderr:6,
	codeErr:7,
	phoneErr:8,
	strNotLong:9,
	strNeq:10,
	existing:11,
	unknow:255,
	success:200
}