import { MigrationInterface, QueryRunner } from "typeorm"

export class GenerateTables1701417778071 implements MigrationInterface {
  name = 'GenerateTables1701417778071'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `)
    await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "book" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "isbn" character varying NOT NULL, "price" double precision NOT NULL, "stock" integer NOT NULL, "categoryId" integer, "authorId" integer, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "bio" text NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "transaction_item" ("id" SERIAL NOT NULL, "bookId" integer NOT NULL, "bookTitle" character varying NOT NULL, "quantity" double precision NOT NULL, "price" double precision NOT NULL, "transactionId" integer, CONSTRAINT "PK_b40595241a69876722f692d041f" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "discount" integer NOT NULL, "totalPrice" double precision NOT NULL, "paid" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying NOT NULL, CONSTRAINT "UQ_24a02b002efb0eb554c2f7773d1" UNIQUE ("code"), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`)
    await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_efaa1a4d8550ba5f4378803edb2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await queryRunner.query(`ALTER TABLE "transaction_item" ADD CONSTRAINT "FK_2705caeb66a0fa4505f53f04e8f" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transaction_item" DROP CONSTRAINT "FK_2705caeb66a0fa4505f53f04e8f"`)
    await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_66a4f0f47943a0d99c16ecf90b2"`)
    await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_efaa1a4d8550ba5f4378803edb2"`)
    await queryRunner.query(`DROP TABLE "transaction"`)
    await queryRunner.query(`DROP TABLE "transaction_item"`)
    await queryRunner.query(`DROP TABLE "author"`)
    await queryRunner.query(`DROP TABLE "book"`)
    await queryRunner.query(`DROP TABLE "category"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`)
    await queryRunner.query(`DROP TABLE "user"`)
  }

}
