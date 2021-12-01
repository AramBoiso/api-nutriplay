import { Body, Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from './entities';
import { UserI } from './interfaces';
import { UserDto } from './dtos/user.dto';
import { Password } from '../passwords/entities/password.entity';
import { PhysicalActivity } from '../../md/physical-activities/entities/physical-activities.entity';
import { PhysicalActivityFrecuency } from '../../md/physical-activity-frecuency/entities/physical_activity_frecuency.entity';
import { PhysicalActivityUser } from '../physical-activity-users/entities/physical-activity-users.entity';
import { Gender } from '../../md/genders/entities/genders.entity';

@Injectable()
export class UsersService {

    constructor(private readonly connection:Connection){}

    async getMany(){
        let users:User[] = await this.connection
            .createQueryBuilder(User, "u")
            .select(["u.userId","u.username"])
            .getMany();



        return users;
    }


    async getOne(userOpts:UserI){
        const user = await this.connection.getRepository(User).findOne(userOpts);
        return user;
    }

    async getUser(userOpts:UserI){
            const user = await this.connection
                .createQueryBuilder(User, "u")
                .innerJoinAndSelect("u.gender", "g")
                .innerJoinAndSelect("u.physicalActivityUser", "pau")
                .innerJoinAndSelect("pau.physicalActivity", "pa")
                .innerJoinAndSelect("pau.physicalActivityFrecuency", "paf")
                .where("u.userId = :userId", userOpts)
                .getOne();

            if(!user)
                throw new NotFoundException({
                    message: "El usuario no fue encontrado"
                });
    
            //genero
            //Edad
            //Peso
            //Estatura
            //Actividad Fisica
            //Frecuencia de activiad fisica
    
            return {
                gender: user.gender.name,
                age: user.age,
                height: user.height,
                weight: user.weight,
                physicActivity: user.physicalActivityUser[0].physicalActivity.name,
                physicalActivityFrecuency: user.physicalActivityUser[0].physicalActivityFrecuency.name
            };
    }

    async createOne(userDto:UserDto){

        const { 
            genderId, 
            physicalActivityId, 
            physicalActivityFrecuencyId, 
            password,
            ...rest  
        } = userDto;

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        let user:User;
        let gender:Gender;
        let userPassword:Password;
        let physicalActivity:PhysicalActivity;
        let physicalActivityFrecuency:PhysicalActivityFrecuency;
        let physicalActivityUser:PhysicalActivityUser;

        try {

            user = await this.connection.getRepository(User).findOne({
                username: userDto.username
            });

            if(user)
                throw new BadRequestException({ message: "El nombre de usuario ya esta en uso, por favor elige otro." });

            gender = await this.connection.getRepository(Gender).findOne(genderId);

            if(!gender)
                 throw new NotFoundException({  message: "El genero seleccionado no fue encontrado."});

            user =  await this.connection.getRepository(User).create({
                gender,
                ...rest
            });
            user = await queryRunner.manager.save(user);

            userPassword = await this.connection.getRepository(Password).create({
                user,
                password
            });
            userPassword = await queryRunner.manager.save(userPassword);

            physicalActivity = await this.connection.getRepository(PhysicalActivity).findOne(physicalActivityId);

            if(!physicalActivity)
                throw new NotFoundException({  message: "La actividad fisica no fue encontrada."});

            physicalActivityFrecuency = await this.connection.getRepository(PhysicalActivityFrecuency).findOne(physicalActivityFrecuencyId);

            if(!physicalActivityFrecuency)
                throw new NotFoundException({  message: "La frecuencia no fue encontrada."});

            physicalActivityUser = await this.connection.getRepository(PhysicalActivityUser).create({
                user,
                physicalActivity,
                physicalActivityFrecuency
            });

            physicalActivityUser = await queryRunner.manager.save(physicalActivityUser);

            await queryRunner.commitTransaction();

          } catch (err) {
            console.log("Error: ", err);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException({
                message: err.message? err.message : "Ocurrio un error al guardar el usuario."
            });
            
          } finally {
            await queryRunner.release();
          }

          return {
            message:"Usuario creado",
            // data:{
            //     user,
            //     userPassword,
            //     physicalActivityUser
            // } 
        };

    }

}
