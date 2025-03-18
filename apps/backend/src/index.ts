import express from 'express';
import cors from 'cors';
import printsRouter from './controllers/prints'
import { PORT } from './utils/config'
import { connectToDatabase } from './utils/db';


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.use('/api', printsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start()