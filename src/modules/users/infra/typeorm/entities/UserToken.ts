import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_Id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
