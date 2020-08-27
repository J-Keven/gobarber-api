import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
export default class Appointments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column()
  date: Date;
}
