const data = [{
    id: "moshe",
    email: 'exemple@a.com',
    password: '123456789'
},
{
    id: "meir",
    email: 'exempleb@meir.com',
    password: '987654321'
},
{
    id: "amit",
    email: 'exemplec@a.com',
    password: '13572469'
}]

const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.send(data)
})

app.get('/:id', (req, res) => {
    const user = data.filter((value)=> req.params.id === value.id)
    res.send(user)
})

app.post('/',(req, res)=>{
  const newUser= JSON.parse(req.body);
  data.push(newUser)
})

app.listen(port, () => {
    console.log(`Server is up and running on port:${port}`);
})
