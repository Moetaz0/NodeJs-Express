const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors middleware
const app = express();
dotenv.config();

//BodyParser Middleware
app.use(express.json());

// Enable CORS
app.use(cors());

mongoose.set("strictQuery", false);
const hotelRouter = require("./routes/Hotel.route");
app.use('/api/hotels', hotelRouter);


// Connexion à la base de données
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((err) => {
    console.log("Impossible de se connecter à la base de données", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("bonjour");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

module.exports = app;
