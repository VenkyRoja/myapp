
const express = require('express');
const app = express();
app.use(express.json());

// Set port and verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;
console.log(port);
console.log(verifyToken);

// Route for GET requests
app.get('/', (req, res) => {
  //const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('mode:', mode);
  console.log('token:', token);
  console.log('env VERIFY_TOKEN:', verifyToken);
  console.log('challenge:', challenge);
  
  if (mode === 'subscribe' && token === verifyToken) {
    console.log('debug1');
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
    
  } else {
    console.log('debug2');
    res.status(403).end();
  }
});

// Route for POST requests
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.status(200).end();
});

// Start the server
app.listen(port, () => {
  console.log(`\nListening on port ${port}\n`);
});
