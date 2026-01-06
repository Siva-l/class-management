import { EnumGender } from '../../types/enum/app_enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const genderEnum: EnumGender[] = [
  EnumGender.MALE,
  EnumGender.FEMALE,
  EnumGender.OTHER,
];

export class CreateStudentsTable1767352230404 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'students',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'admission_no',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'dob',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'enum',
            enumName: 'enum_gender',
            enum: genderEnum,
            isNullable: false,
          },
          {
            name: 'phone',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('students');
    await queryRunner.query(`DROP TYPE IF EXISTS enum_gender`);
  }
}
