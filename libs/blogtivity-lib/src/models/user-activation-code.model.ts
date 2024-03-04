import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.model";


@Entity({
    name: 'user_activation_codes'
})
export class UserActivationCode {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: String;

    @ManyToOne('user_id')
    user: User

    user_id: number;

    @Column({ name: 'expired_at' })
    expiredAt: Date;

    @Column({ name: 'has_used' })
    hasUsed: boolean = false;

    @CreateDateColumn({ name: 'created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}