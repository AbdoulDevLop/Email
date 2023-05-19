//LES MODULES
var express = require("express") ;
var http = require("http");
var path = require("path");
var nodemailer = require("nodemailer");

//DECLARATION DE VARIABLES
var app = express();
var server = http.Server(app);
var port = 500;

//LES SESSIONS
app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extented : true }));
app.use(express.static(path.join(__dirname, "static")));

//Routage
app.get("/", function(req, response) {
    response.sendFile(path.join(__dirname, "static/index.html"));
});

//traitement de l'email
app.post("/send_email", function(req, response) {
    var from = req.body.from;
    var to = "as6997503@gmail.com"; 
    var subject = req.body.subject;
    var message = req.body.message;

    var transporter = nodemailer.createTransport({
        service : 'gmail',
        auth : {
          user : 'abdoulazizsawadogo884@gmail.com',
          pass : 'xezpfahstuceqcxd'
        }
    });

    var mailOptions = {
        from : from,
        to : to,
        subject : subject,
        text : message
    };

    transporter.sendMail(mailOptions,  function(error,  info) {
        if(error)  {
            console.log(error);
        }  else  {
            console.log("E-mail envoyé : "  +  info.response)
        }
        response.redirect("/");
    });
});

//Initialiser le server Web
server.listen(port, function() {
    console.log("server from démarrage sur le port" + port)
});
console.clear();





