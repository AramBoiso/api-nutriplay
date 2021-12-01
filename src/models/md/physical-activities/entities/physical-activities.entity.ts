import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PhysicalActivityUser } from '../../../usr/physical-activity-users/entities/physical-activity-users.entity';

@Entity('physical_activities')
export class PhysicalActivity{

    @PrimaryGeneratedColumn()
    pyshicalActivityId:number;

    @Column()
    name:string;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updateAt:Date;

    @DeleteDateColumn()
    deleteAt:Date;

    @OneToMany( () => PhysicalActivityUser, pau => pau.physicalActivity )
    physicalActivityUser:PhysicalActivityUser[];

}
