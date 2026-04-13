
import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());
const friends = [
  { id: 1, name: "JOHN", city : "delhi" },
  { id: 2, name: "DOE", city : "mumbai" },
  { id: 3, name: "RAMEN", city : "chennai" },
];


app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "home route",
  });
});

app.get("/data", (req, res) => {
  res.json({
    status: 200,
    data: friends,
  });
});


app.post("/data" , (req,res)=>{
    const new_friend = req.body;
    friends.push(new_friend);

    res.json({
        status : "success",
        message : "data added successfully ",
        data : friends
    })
})

app.get("/data/:id" , (req,res)=> {
    
    const new_id = parseInt(req.params.id);

    const friend = friends.find(d=> d.id===new_id)

    if (!friend) {
      return res.status(404).json({
        status: "fail",
        message: "Friend not found",
      });
    }

    res.json({
        status : "success",
        message : "friend found",
        id : new_id,
        data : friend
    })
})



app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
