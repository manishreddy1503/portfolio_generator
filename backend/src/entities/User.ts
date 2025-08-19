import { Entity, ObjectIdColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('users')
export class User {
  @ObjectIdColumn()
  id!: ObjectId;

  @Index({ unique: true })
  @Column()
  googleId!: string;

  @Index({ unique: true })
  @Column()
  email!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}


