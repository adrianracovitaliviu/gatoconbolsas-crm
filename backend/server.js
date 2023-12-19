require('module-alias/register');
const mongoose = require('mongoose');
const Factura = require('./models/appModels/Factura.js'); // Adjust the path based on your project structure
const cors = require('cors');

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 14 || (major === 14 && minor <= 0)) {
  console.log('Please go to nodejs.org and download version 8 or greater. 👌\n ');
  process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: '.variables.env' });

// Connect to our Database and handle any bad connections
// mongoose.connect(process.env.DATABASE);

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🚫 Error → : ${err.message}`);
});


const glob = require('glob');
const path = require('path');

glob.sync('./models/**/*.js').forEach(function (file) {
  require(path.resolve(file));
});


// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 8888);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → On PORT : ${server.address().port}`);
});


// Allow requests from any origin
app.use(cors({ origin: '*' }));


// New route to handle fetching the next Factura number
app.get('/api/Factura/next-number', async (req, res) => {
  try {
    // Find the latest Factura and get its number
    const latestFactura = await Factura.findOne({}, {}, { sort: { 'number': -1 } });
    let nextFacturaNumber = 1;

    if (latestFactura) {
      // If there is a latest Factura, increment its number for the next Factura
      nextFacturaNumber = latestFactura.number + 1;
    }

    // Set content type header
    res.setHeader('Content-Type', 'application/json');
    
    // Send the next Factura number as the JSON response
    res.json({ nextFacturaNumber });
  } catch (error) {
    // Handle errors if any occur during the process
    console.error('Error fetching next Factura number:', error);
    // Send a valid JSON response even in case of errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
});