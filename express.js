const express = require('express');
const app = express();

app.use(express.json());

const shoppingList = [];


app.get('/items', (req, res) => {
  res.json(shoppingList);
});


app.post('/items', (req, res) => {
  const newItem = req.body;
  shoppingList.push(newItem);
  res.json({ added: newItem });
});


app.get('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const item = shoppingList.find(item => item.name === itemName);
  res.json(item);
});


app.patch('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const updatedItem = req.body;
  const index = shoppingList.findIndex(item => item.name === itemName);
  if (index !== -1) {
    shoppingList[index] = { ...shoppingList[index], ...updatedItem };
    res.json({ updated: shoppingList[index] });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});


app.delete('/items/:name', (req, res) => {
  const itemName = req.params.name;
  const index = shoppingList.findIndex(item => item.name === itemName);
  if (index !== -1) {
    shoppingList.splice(index, 1);
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});