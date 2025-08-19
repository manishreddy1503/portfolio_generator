import { Entity, ObjectIdColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

type SocialLinks = {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  other?: string;
};

type Project = {
  name: string;
  description?: string;
  link?: string;
  technologies?: string[];
  imageUrl?: string;
};

type Certification = {
  name: string;
  issuer?: string;
  date?: string;
  link?: string;
};

type Education = {
  school: string;
  degree?: string;
  start?: string;
  end?: string;
  details?: string;
};

type Experience = {
  company: string;
  role: string;
  start?: string;
  end?: string;
  description?: string;
};

@Entity('portfolios')
export class Portfolio {
  @ObjectIdColumn()
  id!: ObjectId;

  @Index()
  @Column()
  userId!: ObjectId;

  @Column()
  profile!: {
    fullName: string;
    title?: string;
    location?: string;
    email?: string;
    phone?: string;
    website?: string;
    avatarUrl?: string;
    socials?: SocialLinks;
  };

  @Column({ default: '' })
  summary!: string;

  @Column({ default: [] })
  skills!: string[];

  @Column({ default: [] })
  projects!: Project[];

  @Column({ default: [] })
  certifications!: Certification[];

  @Column({ default: [] })
  education!: Education[];

  @Column({ default: [] })
  experience!: Experience[];

  @Column({ default: [] })
  achievements!: string[];

  @Column({ default: 'themeA' })
  theme!: 'themeA' | 'themeB' | 'themeC';

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}


