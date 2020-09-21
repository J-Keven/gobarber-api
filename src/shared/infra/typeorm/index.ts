import { createConnection } from 'typeorm';

createConnection().then(() => {
  console.log('DataBase connected');
});
