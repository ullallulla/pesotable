import express from 'express';
import cors from 'cors';
import printsRouter from './controllers/prints'


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.use('/api', printsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});