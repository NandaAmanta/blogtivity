
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserStatus } from '../constants/user-status.constant';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity({
    name: 'users'
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: [
            UserStatus.ACTIVE,
            UserStatus.INACTIVE,
            UserStatus.BANNED,
        ],
        default: UserStatus.INACTIVE,
    })
    status: UserStatus;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

    // check user password with bcrypt
    async checkPassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }

    // hash user password with bcrypt
    async setHashedPassword(password: string): Promise<void> {
        this.password = await bcrypt.hash(password, 10);
    }

}