import { Column, Entity, JoinColumn, ManyToMany, OneToMany } from 'typeorm';
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

  @ManyToMany(() => TeachersEntity, (teacher) => teacher.subjects)
  teachers: TeachersEntity[];

  @ManyToMany(() => ClassTeachersEntity, (classTeacher) => classTeacher.subject)
  classTeachers: ClassTeachersEntity[];
}
