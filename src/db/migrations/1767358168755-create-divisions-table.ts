import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableForeignKeyOptions,
} from 'typeorm';

export class CreateDivisionsTable1767358168755 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableForeignKeys: TableForeignKeyOptions[] = [
      new TableForeignKey({
        columnNames: ['class_id'],
        referencedTableName: 'class',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    ];

    await queryRunner.createTable(
      new Table({
        name: 'divisions',
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
            name: 'class_id',
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
        ],
        foreignKeys: tableForeignKeys,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('divisions');
  }
}
