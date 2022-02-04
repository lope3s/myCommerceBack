import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tokens {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    token: string;

    @Column()
    refreshToken: string;
}
