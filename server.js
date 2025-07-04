const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist'))); // atau 'build' jika CRA

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html')); // atau 'build'
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});