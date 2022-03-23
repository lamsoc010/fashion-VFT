import express from "express";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import expressSession from "express-session";
import morgan from "morgan";


const configViewEngine = (app) => {
    app.use(fileUpload());

    
    app.use(morgan("common"));

    app.use(express.static('./src/public'))
    
    app.use(expressSession({
        secret: 'keyboard cat'
    }))

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({type: 'application/json'}));
    app.use(bodyParser.raw());

    app.set("view engine", "ejs");
    app.set("views", "./src/views")
}

export default configViewEngine;