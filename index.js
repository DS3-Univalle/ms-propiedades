import express from "express"
import mysql from "mysql"
import cors from "cors"


const app = express()
const db = mysql.createConnection({
    host:"bzif0dgvzjp0ltbihfzv-mysql.services.clever-cloud.com",
    user:"uobhlq41ybfzh4h3",
    password:"8jJ8cC8gVEqtVJs7ntkw",
    database:"bzif0dgvzjp0ltbihfzv"
})

app.get("/", (req, res)=>{
    res.json("hello this is backend")
})
app.use(cors());
// GET ALL PROPERTIES
app.get("/cabins", (req, res)=>{
    const q = "SELECT * FROM cabins"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.use(express.json());

// Get one Cabin

app.post("/cabins", (req, res) => {
  const q = "INSERT INTO cabins (`name`, `description`, `location`, `price`, `rooms`, `bathrooms`, `legal_information`, `number_people`, `id_state`) VALUES (?)"
  const values = [
    req.body.name,
    req.body.description,
    req.body.location,
    req.body.price,
    req.body.rooms,
    req.body.bathrooms,
    req.body.legal_information,
    req.body.number_people,
    req.body.id_state
  ]

  db.query(q, [values], (err, data) =>{
    if(err) return res.json(err)
    return res.json("cabin has been created")
  })
})

app.delete("/cabins/:id", (req, res) =>{
  const propertyID = req.params.id;
  const q = "DELETE FROM cabins WHERE id_cabin = ?"

  db.query(q, [propertyID], (err, data) =>{
    if(err) return res.json(err)
    return res.json("Cabin has been deleted")
  })
})

app.put("/cabins/:id", (req, res) =>{
  const propertyID = req.params.id;
  const q = "UPDATE cabins SET `name` = ?, `description` = ?, `location` = ?, `price` = ?, `rooms` = ?, `bathrooms` = ?, `legal_information` = ?, `number_people` = ?, `id_state` = ? WHERE id_cabin = ?"
  const values = [
    req.body.name,
    req.body.description,
    req.body.location,
    req.body.price,
    req.body.rooms,
    req.body.bathrooms,
    req.body.legal_information,
    req.body.number_people,
    req.body.id_state
  ]
 
  db.query(q, [...values, propertyID], (err, data) =>{
    if(err) return res.json(err)
    return res.json("Cabin has been updated")
  })
})

//edit state of cabin
app.put("/cabin/state/:id", (req, res) =>{
  const propertyID = req.params.id;
  const q = "UPDATE cabins SET `id_state` = ? WHERE id_cabin = ?"
  const values = [
    req.body.id_state
  ]
 
  db.query(q, [...values, propertyID], (err, data) =>{
    if(err) return res.json(err)
    return res.json("Cabin state has been updated")
  })
})
// get cabin by id
app.get("/cabin/:id", (req, res) =>{
  const propertyID = req.params.id;
  const q = "SELECT * FROM cabins WHERE id_cabin = ?"

  db.query(q, [propertyID], (err, data) =>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

// get cabins by id_state
app.get("/cabin/state/:id", (req, res) =>{
  const propertyID = req.params.id;
  const q = "SELECT * FROM cabins WHERE id_state = ?"

  db.query(q, [propertyID], (err, data) =>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.listen(3306, ()=>{
    console.log("listening");
})