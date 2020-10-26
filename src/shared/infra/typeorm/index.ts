import { createConnections } from 'typeorm';

createConnections().then(() => {
  console.log('DataBase connected');
});
