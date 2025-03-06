const express=require("express");
const mongoose=require("mongoose");
const app=express();
const cors=require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
mongoose.connect("mongodb+srv://gargmontu3:Sx0AJ3jilswFAmX1@montucluster1.m1fch.mongodb.net/?retryWrites=true&w=majority&appName=MontuCluster1",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
).then(()=>{
    console.log("connected database")
}).catch(error=>{
    console.log(error)
})
const Schema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    image:String,
})
const SchemaFollow=new mongoose.Schema({
  user1:String,
  user2:String,
  status:Number,
})
const SchemaArt=new mongoose.Schema({
  email:String,
  tag:String,
  title:String,
  content:String,
  name:String,
  image:String,
  imageA:String,
  createdAt: {type: Date, default: Date.now},
})
const User=new mongoose.model("User",Schema);
const Article=new mongoose.model("Article",SchemaArt);
const Follow=new mongoose.model("Follow",SchemaFollow);


app.post("/postArticle", async (req, res) => {
  const { name,image,imageA,email,tag,title,content } = req.body;
  try {
      const newArticle = new Article({
       email,tag,title,content,name,image,imageA,
      });
      await newArticle.save();
      res.send({ message: "Article Posted" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});
app.post("/updateArticle/:id", async (req, res) => {
  const {id}=req.params;
  const { name,image,imageA,email,tag,title,content } = req.body;
  try {
    const art=await Article.updateOne({_id:id},{$set:{name,image,imageA,email,tag,title,content}});
    if(art){
      res.send({ message: "Article updated" });
    }
      
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});



app.post("/deleteArt", async (req, res) => {
  const {id}=req.body;
  
  try {
      const article=await Article.deleteOne({_id:id});
      if(article){
        res.send({message:"deleted"});
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});
app.post("/getArticles/:id", async (req, res) => {
  const {email}=req.body;
  
  try {
      const article=await Article.find({email});
      if(article){
        res.send({article});
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});
app.post("/getArticle/:id", async (req, res) => {
  const id=req.params.id;
  
  try {
      const article=await Article.findOne({_id:id});
      if(article){
        res.send({article});
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});
app.get("/getUser/:id", async (req, res) => {
  const id=req.params.id;
  try {
      const user=await User.findOne({_id:id});
      if(user){
        res.send({user});
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});

app.get("/getFollow/:id", async (req, res) => {
 const {id}=req.params;
  try {
      const user=await Follow.find({user1:id});
      if(user){
        res.send({user});
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});
app.get("/getFollow", async (req, res) => {
  
   try {
       const user=await Follow.find();
       if(user){
         res.send({user});
       }
   } catch (error) {
     console.log(error);
     res.status(500).send({ message: "Error occurred" });
   }
 });
app.get("/getUsers", async (req, res) => {
 
  try {
      const user=await User.find();
      if(user){
        res.send({user});
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});
app.get("/getArts", async (req, res) => {
 
  try {
      const user=await Article.find();
      if(user){
        res.send({user});
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});

app.get("/getArticle", async (req, res) => {
  try {
      const article=await Article.find();
      if(article){
        res.send({article});
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});
app.get("/getArticle2", async (req, res) => {
  try {
      const article=await Article.find({tag:"self improvement"});
      if(article){
        res.send({article});
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});
app.get("/getArticle3", async (req, res) => {
  try {
      const article=await Article.find({tag:"programming"});
      if(article){
        res.send({article});
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});
app.get("/getArticle4", async (req, res) => {
  try {
      const article=await Article.find({tag:"technology"});
      if(article){
        res.send({article});
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});
app.get("/getArticle1/:id", async (req, res) => {
  const id=req.params.id;
  try {
      const article=await Article.findOne({_id:id});
      if(article){
        res.send({article});
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});
app.post("/following", async (req, res) => {
  const { user1,user2,status } = req.body;
  try {
        const follow = await Follow.updateOne({ user1,user2 },{$set:{status}})
        if(follow){
          res.send({ message: "unfollowed" });
        }
      
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});
app.post("/follow", async (req, res) => {
  const { user1,user2,status } = req.body;
  try {
    const user = await Follow.findOne({ user1,user2 });
      if (user) {
        const follow = await Follow.updateOne({ user1,user2 },{$set:{status}})
        if(follow){
          res.send({ message: "following" });
        }
      } else {
      const newFollow = new Follow({
        user1,user2,status,
      });
      await newFollow.save();
      res.send({ message: "following" });
      }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error occurred" });
  }
});
app.post("/register", async (req, res) => {
    const { image,name, email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        res.send({ message: "User ALREADY registered" });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          image
        });
        await newUser.save();
        res.send({ message: "Registered successfully" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error occurred" });
    }
  });
  app.post("/login", async (req, res) => {
    const {  email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        if(user.password===password){
          res.send({ message: "Login Successful",user});
        }
        else{
          res.send({ message: "Incorrect Details" });
          
        }
        
      } else {
        
        res.send({ message: "User not Registered" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error occurred" });
    }
  });
app.listen(5000,()=>{
    console.log("server started on 4000")
})