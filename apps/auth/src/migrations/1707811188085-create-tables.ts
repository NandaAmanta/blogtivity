import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1707811188085 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // create table user depending on the user.model.ts
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            status ENUM('ACTIVE', 'INACTIVE', 'BANNED') DEFAULT 'INACTIVE',
            created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
            updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // drop table user
        await queryRunner.query(`DROP TABLE users IF EXISTS`);
    }

}
