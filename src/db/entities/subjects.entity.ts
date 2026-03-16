import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { MarksEntity } from './marks.entity';
import { TeachersEntity } from './teachers.entity';
import { ClassTeachersEntity } from './class_teachers.entity';

@Entity('subjects')
export class SubjectsEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'code', type: 'varchar' })
  code: string;

  @OneToMany(() => MarksEntity, (marks) => marks.subject)
  marks: MarksEntity[];

  @OneToMany(() => TeachersEntity, (teacher) => teacher.subjects)
  teachers: TeachersEntity[];

  @OneToMany(() => ClassTeachersEntity, (classTeacher) => classTeacher.subject)
  classTeachers: ClassTeachersEntity[];
}
