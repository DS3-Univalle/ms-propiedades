import express from "express"
import mysql from "mysql"
import cors from "cors"
import dotenv from 'dotenv';

dotenv.config(); 

const app = express()

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
} = process.env;
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});





app.get('/', (req, res) => {
  res.status(200).send('Hola');
});
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

//get cabin state name
app.get("/cabins/states/:id", (req, res) =>{
  const propertyID = req.params.id;
  const q = "SELECT cabins.id_cabin, states.id_state, states.state FROM cabins JOIN states ON cabins.id_state = states.id_state WHERE cabins.id_cabin = ?"
  db.query(q, [propertyID], (err, data) =>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/cabins-filtered-by-states", (req, res) => {
  // Assuming you are sending an array of state IDs in the query parameters like "?id=1&id=2&id=3"
  const stateIDs = req.query.id;

  // If only one ID is provided, convert it to an array
  const stateIDsArray = Array.isArray(stateIDs) ? stateIDs : [stateIDs];

  // Use the "IN" clause in SQL to filter by multiple state IDs
  const q = "SELECT * FROM cabins WHERE id_state IN (?)";

  db.query(q, [stateIDsArray], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//añadir fotos a la bd con nombre y url
app.post("/photos", (req, res) => {
  const q = "INSERT INTO photos (`url_photo`, `id_cabin`, `id_state`, `name_photo`) VALUES (?)"
  const values = [
    req.body.url_photo,
    req.body.id_cabin,
    req.body.id_state,
    req.body.name_photo
  ]

  db.query(q, [values], (err, data) =>{
    if(err) return res.json(err)
    return res.json("photos added to the cabin bd")
  })
})

app.get("/all-photos-cabin/:id", (req, res) =>{
  const propertyID = req.params.id;
  const q = "SELECT * FROM photos WHERE id_cabin = ?"

  db.query(q, [propertyID], (err, data) =>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

const PORT = process.env.NODE_DOCKER_PORT || 3000
app.listen(PORT, ()=>{
    console.log("listening");
})