import express from 'express'

const app = express()

const port=3002

app.use(express.json())

let teaData=[]
let nextid=1

app.post('/teas',(req,res)=>{
    console.log("CREATE")
    req.body.price
    const{name,price}=req.body
    const newTea = {id:nextid++,name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

app.get('/teas',(req,res)=>{
    console.log("FETCH ALL")
    res.status(200).send(teaData)
})

app.get('/teas/:id',(req,res)=>{
console.log("FETCH")
const tea=teaData.find(t=>t.id===parseInt(req.params.id))
if(!tea){
    return res.status(404).send('Tea not found')
}
res.status(200).send(tea)

})

app.put('/teas/:id', (req,res)=>{
    console.log("UPDATE")
    // const teaId=req.params.id
    const tea=teaData.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not found')
    }
    const {name,price}=req.body
    tea.name=name
    tea.price=price
    res.status(200).send(tea)
})

app.delete('/teas/:id', (req,res)=>{
    const index = teaData.findIndex(t=>t.id===parseInt(req.params.id))
    if(index===-1){
    return res.status(404).send('Tea not found')}
    teaData.splice(index,1)
    return res.status(204).send('Deleted')
})
app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})