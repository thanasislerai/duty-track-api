import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn("increment", { type: "bigint", unsigned: true })
    id: number;

    @Column({ type: "varchar", length: 200, unique: true, nullable: false })
    userName: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    passwordHash: string;

    @Column({ type: "boolean", nullable: false })
    isAdmin: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
