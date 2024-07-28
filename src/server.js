import express from 'express';
const app = express();

app.use(express.json());
app.use('/api', (req, res)=> {
    res.json({return:'API Yandeh Marktplace on!'});
});

const PORT = process.env.PORT || 3344;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
