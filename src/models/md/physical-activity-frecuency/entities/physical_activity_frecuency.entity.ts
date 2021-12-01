import { PhysicalActivityUser } from "src/models/usr/physical-activity-users/entities";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('physical_activity_frecuency')
export class PhysicalActivityFrecuency{

    @PrimaryGeneratedColumn()
    physicalActivityFrecuencyId:number;

    @Column()
    name:string;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updateAt:Date;

    @DeleteDateColumn()
    deleteAt:Date;

    @OneToMany( () => PhysicalActivityUser, pau => pau.physicalActivityFrecuency )
    physicalActivityUser:PhysicalActivityUser[];

}