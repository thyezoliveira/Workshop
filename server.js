
//usei o express pra criar e config do meu servidor
const express = require("express")
const server = express()

const db = require("./db")

//configurar os arquivos Estaticos (css, scripts, imagens)
server.use(express.static("public"))

//habilitar o req.body
server.use(express.urlencoded({extended: true}))

//Nunkucks config
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, //boolean
})

//criar rota Barra (/)
//e capturo o pedido para responder
server.get("/", function(req, res) {

    

     db.all(`
        SELECT * FROM ideias
    `, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro ao receber dados do banco.")
        }

        const ideiasReverso = [...rows].reverse()
        let ultimas_ideias = []
        for (ideia of ideiasReverso) {
            if(ultimas_ideias.length < 2) {
                ultimas_ideias.push(ideia)
            }
        }

        return res.render("index.html", { ideias: ultimas_ideias })
    })



    
})

server.get("/ideias", function(req, res) {

    db.all(`
        SELECT * FROM ideias
    `, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro ao receber dados do banco.")
        }
        const ideiasReverso = [...rows].reverse()
        return res.render("ideias.html", { ideias : ideiasReverso})
    })
})

server.post("/", function(req, res){
    //inserir dados na tabela
    const query = `
        INSERT INTO ideias(
            image,
            title,
            category,
            description,
            link
        ) VALUES(?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro ao inserir dados do banco.")
        }

        return res.redirect("/ideias")
    })
})
//ligar o servidor na porta 3000
server.listen(3000)