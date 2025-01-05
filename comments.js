// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());
app.use(express.static('public'));

// GET /comments
app.get('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.json(JSON.parse(data));
  });
});

// POST /comments
app.post('/comments', (req, res) => {
  fs.readFile('comments.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    const comments = JSON.parse(data);
    const newComment = {
      id: comments.length + 1,
      body: req.body.body
    };
    comments.push(newComment);
    fs.writeFile('comments.json', JSON.stringify(comments, null, 2), err => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
        return;
      }
      res.json(newComment);
    });
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});