/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterLoad,
  AfterInsert,
  AfterUpdate,
} from "typeorm";

@Entity({ name: "developers" })
export class Developer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: "char", length: 1, default: "F" })
  sexo: string;

  protected idade: number;

  @Column({
    nullable: true,
  })
  hobby: string;

  @Column()
  dataNascimento: Date;

  @AfterUpdate()
  @AfterInsert()
  @AfterLoad()
  getIdade() {
    this.idade =
      new Date(
        Date.now() -
        (
          typeof this.dataNascimento === "string"
            ? Date.parse(this.dataNascimento)
            : this.dataNascimento.getTime()
        )
      ).getFullYear() - 1970;
  }
}
