import app from './index';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`server Started in http://localhost:${PORT}`);
});
