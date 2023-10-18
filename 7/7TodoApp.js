const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// Task 1
app.get('/addtask',(req,res)=>{
  let obj={};
  obj.title=req.query.title; 
  obj.id=req.query.id;
  obj.status=req.query.status;
  fs.readFile('./todo.json',(err,data)=>{
      if(err) throw err;
      let task=JSON.parse(data);
      task.push(obj);
      fs.writeFile('./todo.json',JSON.stringify(task),(err)=>{
          if(err) throw err;
          res.send('Task Added Successfully');
      });
  });
});

// Task 2
app.get('/tasks', (req, res) => {
  try {
    const { status } = req.query;
    const tasks = JSON.parse(fs.readFileSync('todo.json'));
    const filteredTasks = tasks.filter(task => task.status === status);
    res.json(filteredTasks);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
