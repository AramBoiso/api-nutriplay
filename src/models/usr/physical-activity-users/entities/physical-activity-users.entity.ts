import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';
import { PhysicalActivity } from '../../../md/physical-activities/entities/physical-activities.entity';
import { PhysicalActivityFrecuency } from '../../../md/physical-activity-frecuency/entities/physical_activity_frecuency.entity';

@Entity('physical_activity_users')
export class PhysicalActivityUser{

    @PrimaryGeneratedColumn()
    physicalActivityUserId:number;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updateAt:Date;

    @DeleteDateColumn()
    deleteAt:Date;

    @ManyToOne( () => User, user => user.physicalActivityUser)
    @JoinColumn({name: 'userId'})
    user:User;

    @ManyToOne( () => PhysicalActivity, pa => pa.physicalActivityUser)
    @JoinColumn({name: 'physicalActivityId'})
    physicalActivity:PhysicalActivity;

    @ManyToOne( () => PhysicalActivityFrecuency, paf => paf.physicalActivityUser )
    @JoinColumn({name: 'physicalActivityFrecuencyId'})
    physicalActivityFrecuency:PhysicalActivityFrecuency;

}