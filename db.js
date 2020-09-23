const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./sws.db')

db.serialize(function(){

    // criar tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideias(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );    
    `)
    //inserir dados na tabela
    /* const query = `
        INSERT INTO ideias(
            image,
            title,
            category,
            description,
            link
        ) VALUES(?,?,?,?,?);
    `

    const values = [
        "https://www.flaticon.com/svg/static/icons/svg/1006/1006363.svg",
        "Codificando",
        "Estudo",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo non ad tenetur inventore.",
        "#"
    ]

    db.run(query, values, function(err){
        if(err) return console.log(err)

        console.log(this)
    }) */
    
    // deletar um dado da tabela
    /* db.run(`DELETE FROM ideias WHERE id = ?`, [1], function(err){
        if (err) return console.log(err)

        console.log("DELETEI", this)
    }) */

    //consultar dados na tabela
   /*  db.all(`
        SELECT * FROM ideias
    `, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    }) */


})

module.exports = db