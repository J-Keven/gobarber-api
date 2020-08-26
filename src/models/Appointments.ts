import { uuid } from 'uuidv4';

export default class Appotments {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appotments, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}
