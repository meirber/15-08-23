const data = [{
    id: "1",
    email: 'exemple@a.com',
    password: '123456789'
},
{
    id: "2",
    email: 'exempleb@meir.com',
    password: '987654321'
},
{
    id: "3",
    email: 'exemplec@a.com',
    password: '13572469'
}]

const { log } = require('console');
const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());

app.get('/', (req, res) => {
    console.log("amit");
    res.send(data);
})

app.get('/:id', (req, res) => {
    const user = data.filter((value) => req.params.id === value.id);
    const answer = user.length === 0 ? "No user exists" : user;
    res.send(answer);
})

app.post('/User-creation', (req, res) => {
    const newUser = req.body;
    const user = data.filter((element) =>
        element.id === newUser.id);
    if (user.length !== 0) res.send("User already exists");
    else {
        data.push(newUser)
        res.send("User creation complete")
    }
});

app.put('/user-update/:id', (req, res) => {
    const newUser = req.body;
    data.forEach((element, i) => {
        if (element.id === req.params.id) data[i] = newUser;
    });
    res.send("user update complete");
})

app.delete('/delete-user/:id', (req, res) => {
    let user = 0;
    data.forEach((element, i) => {
        if (element.id === req.params.id) {
            data.splice(data[i], 1);
            user = 1;
            res.send("user delete complete")
        };
    });
    if (user === 0) res.send("User does not exist");
})

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
}) 
