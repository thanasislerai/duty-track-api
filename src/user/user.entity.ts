import { Leave } from "src/leave/leave.entity";
import { Report } from "../report/report.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

enum Rank {
    Private = 'Στρατιώτης',
    LanceCorporal = 'Υποδεκανέας',
    Corporal = 'Δεκανέας',
    Sergeant = 'Λοχίας',
    StaffSergeant = 'Επιλοχίας',
    MasterSergeant = 'Αρχιλοχίας',
    WarrantOfficer = 'Ανθυπασπιστής',
    ReserveOfficerCadet = 'Δόκιμος Έφεδρος Αξιωματικός',
    SecondLieutenant = 'Ανθυπολοχαγός',
    Lieutenant = 'Υπολοχαγός',
    Captain = 'Λοχαγός',
    Major = 'Ταγματάρχης',
    LieutenantColonel = 'Αντισυνταγματάρχης',
    Colonel = 'Συνταγματάρχης',
    Brigadier = 'Ταξίαρχος',
    MajorGeneral = 'Υποστράτηγος',
    LieutenantGeneral = 'Αντιστράτηγος',
    General = 'Στρατηγός',
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
    id: number;

    @Column({ type: 'varchar', length: 255 })
    passwordHash: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    ldapId: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'boolean' })
    isAdmin: boolean;

    @Column({ type: 'date' })
    dateOfDismissal: Date;

    @Column({
        type: 'enum',
        enum: Rank,
    })
    rank: Rank;

    @Column({ type: 'int' })
    points: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Relationships
    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @OneToMany(() => Leave, (leave) => leave.user)
    leaves: Leave[];
}
