const express = require('express');
const app = express();

/* ENV */
const PORT = 1500

/* Routes */
app.get('/', (req, res)=>
{
    res.send('FENOBOOK SOON')
})

app.listen(PORT, () => console.log(`[SERVER] open in the port ${PORT}`));