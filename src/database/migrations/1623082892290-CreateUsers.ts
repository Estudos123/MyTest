import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1623082892290 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        "name": "id",
                        "type": "uuid",
                        "isPrimary": true
                    },
                    {
                        "name": "name_user",
                        "type": "varchar"
                    },
                    {
                        "name": "email",
                        "type": "varchar",
                        "isUnique": true
                    },
                    {
                        "name": "user",
                        "type": "varchar",
                        "isUnique": true
                    },
                    {
                        "name": "is_active",
                        "type": "boolean",
                        "default": false
                    },
                    {
                        "name": "password",
                        "type": "varchar"
                    },
                    {
                        "name": "created_at",
                        "type": "timestamp",
                        "default": "now()"
                    },
                    {
                        "name": "updated_at",
                        "type": "timestamp",
                        "default": "now()"
                    },
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");

    }

}
