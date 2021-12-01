import { 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToMany, 
    OneToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn 
} from "typeorm";
import { Password } from "../../passwords/entities";
import { Gender } from '../../../md/genders/entities/genders.entity';
import { ScoreUser } from '../../score-users/entities/score-users.entity';
import { PhysicalActivityUser } from '../../physical-activity-users/entities/physical-activity-users.entity';

@Entity({ name: 'users'})
export class User{

    @PrimaryGeneratedColumn()
    userId:number;

    @OneToMany(type => Password, password => password.user)
    password:Password[];

    @Column({
        default:'student'
    })
    role:string;

    @Column({
        unique: true,
        nullable: true
    })
    email:string;

    @Column({
        unique: true
    })
    username:string;

    @Column()
    age:number;

    @Column()
    height:number;

    @Column()
    weight:number;

    @CreateDateColumn()
    createAt:Date;

    @UpdateDateColumn()
    updateAt:Date;

    @DeleteDateColumn()
    deleteAt:Date;

    @ManyToOne( () => Gender, gender => gender.user )
    @JoinColumn({name: 'genderId'})
    gender:Gender;

    @OneToMany( () => ScoreUser, su => su.user )
    scoreUser:ScoreUser[];

    @OneToMany( () => ScoreUser, su => su.player )
    scorePlayer:ScoreUser[];

    @OneToMany( () => PhysicalActivityUser, pau => pau.user )
    physicalActivityUser:PhysicalActivityUser[];

}