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

const express = require('express');
const app = express();
const port = 3001;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const passwordValidator = require('password-validator');
const schema = new passwordValidator();
schema
    .is().min(8)
    .has().uppercase()
    .has().lowercase();

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
    if (!validator.isEmail(newUser.email))
        res.send(`${newUser.email} is a valid email address.`);
    else if (!schema.validate(newUser.password))
        res.send(`${newUser.password} is not a suitable password.`);
    else {
        const user = data.filter((element) =>
            element.id === newUser.id);
        if (user.length !== 0) res.send("User already exists");
        else {
            passwordSecurity(newUser.password)
                .then((passwordHash) => {
                    newUser.password = passwordHash;
                    newUser.uuid = uuidv4();
                    data.push(newUser);
                    res.send("User creation complete")
                })
        }
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

app.post('/User-login', (req, res) => {
    const newUser = req.body;
    data.forEach((element, i) => {
        if (element.email === newUser.email) {
            console.log('has email', data[i]);
            bcrypt.compare(newUser.password, element.password).then(data=>console.log(data))
        }
        //  && bcrypt.compare(newUser.password, element.password))
        // console.log(bcrypt.compare(newUser.password, element.password));
        // res.send("User is connected");
    });
    res.send("wrong credentials");
}
);

async function passwordSecurity(password) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    return passwordHash;
}

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
}) 
