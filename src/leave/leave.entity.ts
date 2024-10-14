import { User } from "../user/user.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

export enum LeaveStatus {
    REQUESTED = "Requested",
    APPROVED = "Approved",
    DECLINED = "Declined",
}

@Entity("leave")
export class Leave {
    @PrimaryGeneratedColumn("increment", { type: "int", unsigned: true })
    id: number;

    @Column({ type: "date" })
    startDate: Date;

    @Column({ type: "date" })
    endDate: Date;

    @Column({
        type: "enum",
        enum: LeaveStatus,
    })
    status: LeaveStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.leaves)
    user: User;
}
