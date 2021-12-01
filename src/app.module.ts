import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app/app.config.module';
import { MysqlProviderModule } from './providers/database/mysql/mysql.provider.module';
import { UsersModule } from './models/usr/users/users.module';
import { PasswordsModule } from './models/usr/passwords/passwords.module';
import { GendersModule } from './models/md/genders/genders.module';
import { PhysicalActivitiesModule } from './models/md/physical-activities/physical-activities.module';
import { PhysicalActivityFrecuencyModule } from './models/md/physical-activity-frecuency/physical-activity-frecuency.module';
import { GamesModule } from './models/md/games/games.module';
import { ScoreUsersModule } from './models/usr/score-users/score-users.module';
import { PhysicalActivityUsersModule } from './models/usr/physical-activity-users/physical-activity-users.module';


@Module({
  imports: [ 
    //Configura las variables de entorno.
    AppConfigModule,
    //Realiza la conexión a la base de datos.
    MysqlProviderModule,
    AuthModule,
    UsersModule,
    PasswordsModule,
    GendersModule,
    PhysicalActivitiesModule,
    PhysicalActivityFrecuencyModule,
    GamesModule,
    ScoreUsersModule,
    PhysicalActivityUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
