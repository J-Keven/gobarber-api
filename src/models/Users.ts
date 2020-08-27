import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/* KISS - Keep it Simple & Stupid --- matenha simples e estúpido
 ** Esse principio diz que devemos sempre manter o codigo o mais simples e estúpido possível, para que
 ** qualquer pessoa consiga entender;
 */

@Entity()
class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Users;
