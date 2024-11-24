let express=require("express");
let app=express();
let port = 8080;

app.listen(port,()=>{
    console.log(`listen on the port ${port}`);
});
const path=require("path");

app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));


const { v4: uuidv4 } = require('uuid');

const methodOverride=require("method-override");
app.use(methodOverride('_method'));

let posts=[
    {
        id:uuidv4(),
        username:"Udit Pandey",
        content:"No thinking is the best option for mind stress."

    },
    {
        id:uuidv4(),
        username:"Ram Jee Yadev",
        content:"Always be happy"
    },
    {
        id:uuidv4(),
        username:"Himanshu Mishra",
        content:"hello hello hello hello hello"
    },
    {
        id:uuidv4(),
        username:"Sachine verma",
        content:" power of the subconcious mind"
    },
    {
        id:uuidv4(),
        username:"Sachine",
        content:" power of the subconcious mind"

    }
];

app.get("/posts",(req,res)=>{  
    res.render("Index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("New.ejs");
});

app.post("/posts",(req,res)=>{

    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");// redirect the page after submit.
});
app.get("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);

    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let{id}=req.params;
    let newcontent= req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;

    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let{id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("Edit.ejs");


});

app.delete("/posts/:id",(req,res)=>{
    let{id}=req.params;
    posts=posts.filter((p)=>id !==p.id);
    res.redirect("/posts");
});