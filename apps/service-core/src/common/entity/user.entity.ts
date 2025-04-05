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
        comment: 'Дата створення',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        comment: 'Дата останнього оновлення',
    })
    updatedAt: Date;

    @Column({
        type: 'boolean',
        default: false,
        comment: 'Чи був надісланий push користувачу',
    })
    isPushed: boolean;
}
