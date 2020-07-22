var express = require('express');
var session = require('express-session');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var view = __dirname + "/views/";
var public = __dirname + "/public/";


var connection=mysql.createConnection({
    host:'localhost',
    user:'sandarsc_krisna',
    password:'FinalProjectSMT4',
    database:'sandarsc_restaurant'
});

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
});


app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// menampilkan homepage
app.get('/',(req, res) => {
    res.render('index', { 
        title : 'Home'      
    });
});
//menampilkan menu
app.get('/menu',(req, res) => {
    res.render('menu', {  
        title : 'Menu'     
    });
});
//menampilkan staff
app.get('/staff',(req, res) => {
    res.render('staff', {  
        title : 'Staff'     
    });
});
//menampilkan menu reservasi
app.get('/reservasi',(req, res) => {
    res.render('reservasi', { 
        title : 'Reservasi'      
    });
});
// menampilkan halaman thanks
app.get('/thanks',(req, res) => {
    res.render('thanks', {       
    });
});
//menampilkan halaman karyawan
app.get('/karyawan',(req, res) => {
    let sql = "SELECT * FROM staff";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('karyawan', {
            user : rows
            
        });
    });
});


app.get('/krisna-prihadiyanto',(req, res) => {
    const userId = '18112435';
    let sql = `Select * from staff where nim = ${userId}`;
    let query = connection.query(sql,(err, rows) => {
        if(err) throw err;
        res.render('staff1', {
            title : 'Detail Staff - krisna prihadiyanto',
            staff : rows
        });
    });
});
app.get('/muhammad-akmal',(req, res) => {
    const userId = '18112412';
    let sql = `Select * from staff where nim = ${userId}`;
    let query = connection.query(sql,(err, rows) => {
        if(err) throw err;
        res.render('staff1', {
            title : 'Detail Staff - 	Muhammad Akmal A W',
            staff : rows
        });
    });
});
app.get('/riko-aditiya',(req, res) => {
    const userId = '18112392';
    let sql = `Select * from staff where nim = ${userId}`;
    let query = connection.query(sql,(err, rows) => {
        if(err) throw err;
        res.render('staff1', {
            title : 'Detail Staff - Riko Aditiya N',
            staff : rows
        });
    });
});
app.get('/sintiya-aprili-yanti',(req, res) => {
    const userId = '18112440';
    let sql = `Select * from staff where nim = ${userId}`;
    let query = connection.query(sql,(err, rows) => {
        if(err) throw err;
        res.render('staff1', {
            title : 'Detail Staff - Sintiya Aprili Yanti',
            staff : rows
        });
    });
});
app.get('/chairunisa-nur-afifa',(req, res) => {
    const userId = '18112448';
    let sql = `Select * from staff where nim = ${userId}`;
    let query = connection.query(sql,(err, rows) => {
        if(err) throw err;
        res.render('staff1', {
            title : 'Detail Staff - Ikram Ihamadi Ferdin',
            staff : rows
        });
    });
});
app.get('/ikram-ihamadi-ferdinan',(req, res) => {
    const userId = '18112390';
    let sql = `Select * from staff where nim = ${userId}`;
    let query = connection.query(sql,(err, rows) => {
        if(err) throw err;
        res.render('staff1', {
            title : 'Detail Staff - Ikram Ihamadi Ferdin',
            staff : rows
        });
    });
});



//CD
app.post('/save',(req, res) => { 
    let data = {tang_res: req.body.tang_res, hour_res: req.body.hour_res, people_res: req.body.people_res, name: req.body.name, email: req.body.email, phone: req.body.phone};
    let sql = "INSERT INTO reservasi SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/thanks');
    });
});

app.get('/delete/:id',(req, res) => {
    const id = req.params.id;
    let sql = `DELETE from reservasi where id = ${id}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/admin');
    });
});
app.get('/edit/:nim',(req, res) => {
    const userId = req.params.nim;
    let sql = `Select * from staff where nim = ${userId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('edit', {
            title : 'edit profil',
            user : result[0]
        });
    });
});


app.post('/update',(req, res) => {
    const userId = req.body.nim;
    let sql = "update staff SET nim='"+req.body.nim+"',  nama='"+req.body.nama+"',  jobdesk='"+req.body.jobdesk+"',  instagram='"+req.body.instagram+"' where nim ="+userId;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/karyawan');
    });
});

// Login
app.get('/login',(req, res) => {
    res.render('login', {  
        title : 'login'     
    });
});


  app.get('/admin-login', (req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
	let sql = "SELECT * FROM reservasi";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        
        res.render('admin', {
            reservasi : rows
            
        });
    });
    
});

//auth
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.post('/auth', function(req, res) {
	var nama = req.body.nama;
	var nim = req.body.nim;
	if (nama && nim) {
		connection.query('SELECT * FROM staff WHERE nama = ? AND nim = ?', [nama, nim], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.nama = nama;
				res.redirect('/admin');
			} else {
				res.redirect('/login');
			}			
			
		});
	} else {
		res.redirect('/login');
	}
});

app.get('/admin', function(req, res) {
	if (req.session.loggedin == true) {
		res.redirect('/admin-login');
	} else {
		res.redirect('/login');
	}
	res.end();
});


app.use('/', express.static(public));
app.listen(3000);
console.log('halooo')