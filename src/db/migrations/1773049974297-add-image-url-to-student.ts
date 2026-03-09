import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddImageUrlToStudent1773049974297 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'image_url',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('students', 'image_url');
  }
}
