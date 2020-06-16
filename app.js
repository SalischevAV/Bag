const express = require("express");
const bodyparser = require("body-parser");

let nextID = 3;
const items = [
    {id: 1, name: "Pen"},
    {id: 2, name: "Notepad"},
];

const app = express();
app.use(express.static(__dirname + "/public"));
app.use("/api", bodyparser.json());

app.get("/api/items", (req, res) => {
    res.json(items);
});
app.get("/api/items/:id", (req, res, next) =>{
    const id = Number(req.params["id"]);
    const item = items.find((i) => i.id == id);
    if(item){
        res.json(item);
    } else next();
});
app.post("/api/items", (req, res)=>{
    const body = req.body;
    console.log(body);
    if(typeof body === "object" && "name" in body){
        items.push({
            id: nextID++,
            name: body.name
        });
        res.status(200);
        res.set("Location", `${req.baseURL}/${nextID-1}`);
        res.end();
    } else {
        res.status(400);
        res.end();
    }
});

app.put("/api/items/:id", (req, res, next) =>{
    const id = Number(req.params["id"]);
    const body = req.body;
    const item = items.find((i) => i.id == id);
    if(item){
        if(typeof body === "object" && "name" in body){
            item.name = body.name;
            res.end();
        } else {
            res.status(400);
            res.end();
        } 
    } else {
        next();
    }
});

app.delete("/api/items/:id", (req, res, next) => {
    const id = Number(req.params["id"]);
    console.log(id);
    if(items.find((i) => i.id == id)){
    items.splice(id-1,1);
    res.status(200);
    res.end();
    } else next();
});


app.listen(3000);