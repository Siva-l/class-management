import { Column, Entity, OneToMany, VirtualColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { DivisionsEntity } from './divisions.entity';

@Entity('class')
export class ClassEntity extends BaseEntity {
  @Column({ name: 'grade', type: 'int', unique: true })
  grade: number;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  description?: string;

  @OneToMany(() => DivisionsEntity, (division) => division.class)
  divisions: DivisionsEntity[];

  @VirtualColumn({
    query: (alias) => `
      SELECT COUNT(DISTINCT se.student_id)::int
      FROM student_enrollments se
      JOIN divisions d ON d.id = se.division_id
      JOIN marks m ON m.student_id = se.student_id
      WHERE d.class_id = ${alias}.id
        AND se.status = 'ACTIVE'
        AND m.is_absent = false
        AND m.marks_obtained >= 49
    `,
  })
  passedStudentsCount: number;
}
