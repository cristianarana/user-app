import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,  } from "typeorm";
import { IUser } from "../interface/user.model";
import { IsNotEmpty, IsString, Length } from "class-validator";


@ObjectType()
@Entity('user')
export class User implements IUser{
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id?: number;

    @Field()
    @Column({type: "varchar", length: 80})
    @IsString()
    @IsNotEmpty()
    @Length(1, 80)
    name: string;

    @Field()
    @Column({type: "varchar", length: 80})
    @IsString()
    @IsNotEmpty()
    @Length(1, 80)
    email: string;

    @Field()
    @Column({type: "varchar", length: 80})
    @IsString()
    @IsNotEmpty()
    @Length(1, 80)
    paswd: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @Column()
    deletedBy: number;
}