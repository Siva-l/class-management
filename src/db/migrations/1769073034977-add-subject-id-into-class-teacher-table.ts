import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddSubjectIdIntoClassTeacherTable1769073034977 implements MigrationInterface {
  private readonly foreignKey = new TableForeignKey({
    columnNames: ['subject_id'],
    referencedTableName: 'subjects',
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'class_teachers',
      new TableColumn({
        name: 'subject_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey('class_teachers', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('class_teachers', this.foreignKey);

    await queryRunner.dropColumn('class_teachers', 'subject_id');
  }
}
