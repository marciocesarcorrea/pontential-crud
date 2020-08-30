import {MigrationInterface, QueryRunner} from "typeorm";

export class developers1598659783638 implements MigrationInterface {
    name = 'developers1598659783638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "developers" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "sexo" character(1) NOT NULL DEFAULT 'F', "hobby" character varying, "dataNascimento" TIMESTAMP NOT NULL, CONSTRAINT "PK_247719240b950bd26dec14bdd21" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "developers"`);
    }

}
