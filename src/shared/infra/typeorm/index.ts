import { createConnections } from 'typeorm';

createConnections().then(() => {
  console.log('DataBases connected');
});
