import { groupCollapsed } from 'node:console';
import { Entity, Column, CreateDateColumn, PrimaryColumn} from 'typeorm';
import {v4 as uuid } from 'uuid';


@Entity('users')
    
class Users {

    

    @PrimaryColumn()
    id: string;

    @Column()
    name_user: string;

    @Column()
    email: string;

    @Column()
    user: string;

    @Column()
    is_active: boolean;

    @Column()
    password: string;
    
    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;


    constructor(){
        if(!this.id){
            this.id = uuid();
        }
        if(!this.is_active){
            this.is_active = false;
        }
    }
    
}

export { Users };