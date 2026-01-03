import { EnumStatus } from '../../types/enum/app_enum';
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableForeignKeyOptions,
} from 'typeorm';

const enumStatus: EnumStatus[] = [EnumStatus.ACTIVE, EnumStatus.INACTIVE];

export class CreateStudentEnrollmentsTable1767420444671 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableForeignKeys: TableForeignKeyOptions[] = [
      new TableForeignKey({
        columnNames: ['student_id'],
        referencedTableName: 'students',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['division_id'],
        referencedTableName: 'divisions',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    ];

    await queryRunner.createTable(
      new Table({
        name: 'student_enrollments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'student_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'division_id',
            type: 'uuid',
            isNullable: false,
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
          {
            name: 'status',
            type: 'enum',
            enumName: 'enum_status',
            enum: enumStatus,
          },
        ],
        foreignKeys: tableForeignKeys,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('student_enrollments');
    await queryRunner.query(`DROP TYPE IF EXISTS enum_status`);
  }
}
