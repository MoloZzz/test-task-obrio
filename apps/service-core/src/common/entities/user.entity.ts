import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false, unique: true })
    name: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        comment: 'Creation date',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        comment: 'Last update date',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}
