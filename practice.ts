const express = require('express');
const app = express();
app.use(express.json());

interface User {
    name:string,
    email:string
}

let cody:User = {
    name:'cody',
    email:'cody@mail.com'
}

let chad:User = {
    name:'chad',
    email:'chad@mail.com'
}

let users:User[] = [cody,chad];


app.get('/users',(req,res,next)=>{
    res.send(users);
});

app.get('/users/:email',(req,res,next)=>{
    let email:string = req.params.email;
    let userFound = users.find((item)=>item.email === email);
    
    if(userFound){
        res.send(userFound);
    }else{
        res.status(404).send('user with email:' + email + ' not found');
    }
});

app.post('/users',(req,res,next)=>{
    let newUser:User = req.body;
    let userFound = users.find((item)=>item.email === newUser.email);

    if(userFound === undefined){
        users.push(newUser);
        res.status(201).send(newUser);
    }else{
        res.status(409).send('user with email:' + newUser.email + ' already exists.');
    }
});

app.put('/users/:email',(req,res,next)=>{
    let email = req.params.email;
    let userIndex = users.findIndex((item)=>item.email === email);
    if(userIndex === -1){
        res.status(404).send('user with email:' + email + ' does not exist.');
    }else{
        let userUpdate:User = req.body;
        users[userIndex] = userUpdate;
        res.status(200).send(users[userIndex]);
    }
})

app.delete('/users/:email',(req,res,next)=>{
    let email = req.params.email;
    let userIndex = users.findIndex((item)=>item.email === email);

    if(userIndex === -1){
        res.status(404).send('user with email:' + email + ' does not exist.');
    }else{
        users.splice(userIndex,1);
        res.status(200).send('user deleted successfully');
    }
});

app.listen(3000,()=>{
    console.log('listening on port:' + 3000);
});
