import express from "express";

export default function configViewEngine (){
app.use(express.static("./src/public"));
app.set("view engine","ejs");
app.set("views","./src/views");
}
module.exports = configViewEngine;