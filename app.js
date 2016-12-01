let express    = require('express');
let app        = express();
let router     = express.Router();
let partials   = require('express-partials');
let ejs        = require("ejs");
let redisConfig= require("./config/config.js").redis;
let bodyParser = require('body-parser');
let session = require('express-session');
let cookieParser = require('cookie-parser');
var MySQLStore = require('express-mysql-session')(session);
var config=require("./config/config.js").db;
let sesstionOption={
    host: config.host,// Host name for database connection.
    port: config.port,// Port number for database connection.
    user: config.username,// Database user.
    password: config.password,// Password for the above database user.
    database: config.database,// Database name.
    // checkExpirationInterval: 900000,// How frequently expired sessions will be cleared; milliseconds.
    // expiration: 86400000,// The maximum age of a valid session; milliseconds.
    // createDatabaseTable: true,// Whether or not to create the sessions database table, if one does not already exist.
    // connectionLimit: 1,// Number of connections when creating a connection pool
    // schema: {
    //     tableName: 'sessions',
    //     columnNames: {
    //         session_id: 'session_id',
    //         expires: 'expires',
    //         data: 'data'
    //     }
    // }	
}
console.log(sesstionOption);
var sessionStore = new MySQLStore(sesstionOption);
app.use(bodyParser());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html',ejs.__express);
app.set('view engine', 'html');
app.use(partials());//生成表单中的form,当前版本已经将此分离出来了
app.use(express.static( __dirname + '/static'));
app.use(express.static('/now/hangxun_v1'));//app目录html目录
app.use(cookieParser('zengw'));
app.use(session({
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 60000*60*24,secure:false },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    secret: "config.session.secret",
    store: sessionStore,
    saveUninitialized: true,
}));
require('./route/routes')(app);
let server = app.listen(3100, function () {
	let host = server.address().address;
	let port = server.address().port;
	console.log('App start listening at http://%s:%s', host, port);
});