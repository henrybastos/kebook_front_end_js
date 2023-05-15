require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT | 3000;

app.use(express.static(__dirname + '/public'));
app.use(cors());

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/src/routes/index.html');
})

app.get('/checkout', (req, res) => {
   res.json({
      "payment_method": req.query.payment_method,
      "profile_amount": req.query.profile_amount,
      "final_price": req.query.final_price
   });
})

app.listen(PORT, () => {
   console.log(`App listening on port http://localhost:${PORT}`);
})
