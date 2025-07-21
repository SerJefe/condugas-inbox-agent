import 'dotenv/config';
import express from 'express';
import { classify } from './config/openai.js';
import { createTask } from './config/todoist.js';
import { fetchMessage } from './config/graph.js';
import { verifyWa, parseWa } from './config/whatsapp.js';

const app = express();
app.use(express.json());

app.post('/outlook', async (req, res) => {
  for (const { resource } of req.body.value) {
    const mail = await fetchMessage(resource);
    const task = await classify(mail);
    if (task.action !== 'archivar') await createTask(task);
  }
  res.sendStatus(202);
});

app.get('/whatsapp', verifyWa);
app.post('/whatsapp', async (req, res) => {
  for (const text of parseWa(req.body)) {
    const task = await classify(text);
    await createTask(task);
  }
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`API ready on port ${process.env.PORT || 3000}`)
);
