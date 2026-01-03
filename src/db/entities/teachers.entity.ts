import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ClassTeachersEntity } from './class_teachers.entity';

@Entity()
export class TeachersEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email: string;

  @Column({ name: 'phone', type: 'varchar', unique: true })
  phone: string;

  @OneToMany(() => ClassTeachersEntity, (classTeacher) => classTeacher.teacher)
  classTeachers: ClassTeachersEntity[];
}
