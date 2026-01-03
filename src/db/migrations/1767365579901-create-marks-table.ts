import { EnumGrade } from '../../types/enum/app_enum';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableForeignKeyOptions,
} from 'typeorm';

const enumGrade: EnumGrade[] = [
  EnumGrade.S,
  EnumGrade.A,
  EnumGrade.B,
  EnumGrade.C,
  EnumGrade.D,
  EnumGrade.F,
];

export class CreateMarksTable1767365579901 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableForeignKeys: TableForeignKeyOptions[] = [
      new TableForeignKey({
        columnNames: ['exam_id'],
        referencedTableName: 'exams',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['subject_id'],
        referencedTableName: 'subjects',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['student_id'],
        referencedTableName: 'students',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    ];
    await queryRunner.createTable(
      new Table({
        name: 'marks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'exam_id',
            type: 'uuid',
          },
          {
            name: 'subject_id',
            type: 'uuid',
          },
          {
            name: 'student_id',
            type: 'uuid',
          },
          {
            name: 'marks_obtained',
            type: 'int',
          },
          {
            name: 'is_absent',
            type: 'boolean',
          },
          {
            name: 'grade',
            type: 'enum',
            enumName: 'enum_grade',
            enum: enumGrade,
          },
          {
            name: 'remarks',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: tableForeignKeys,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('marks');
    await queryRunner.query(`DROP TYPE IF EXISTS enum_grade`);
  }
}
