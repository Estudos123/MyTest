import { Entity, PrimaryColumn, Column, JoinColumn, ManyToMany, ManyToOne, CreateDateColumn } from 'typeorm'
import { Users } from './Users';
import { v4 as uuid } from 'uuid'

@Entity("messages")
class Message {
    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @Column()
    text: string;

    @JoinColumn({ name : "user_id"})
    @ManyToOne(() => Users)
    user: Users;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }

}

export {Message}