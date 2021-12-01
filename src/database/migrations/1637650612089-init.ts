import {MigrationInterface, QueryRunner} from "typeorm";

export class init1637650612089 implements MigrationInterface {
    name = 'init1637650612089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `passwords` (`passwordId` int NOT NULL AUTO_INCREMENT, `password` varchar(255) NOT NULL, `create_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `update_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `delete_at` datetime(6) NULL, `userId` int NULL, PRIMARY KEY (`passwordId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `genders` (`genderId` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleteAt` datetime(6) NULL, PRIMARY KEY (`genderId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `physical_activities` (`pyshicalActivityId` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleteAt` datetime(6) NULL, PRIMARY KEY (`pyshicalActivityId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `physical_activity_frecuency` (`physicalActivityFrecuencyId` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleteAt` datetime(6) NULL, PRIMARY KEY (`physicalActivityFrecuencyId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `physical_activity_users` (`physicalActivityUserId` int NOT NULL AUTO_INCREMENT, `createAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleteAt` datetime(6) NULL, `userId` int NULL, `physicalActivityId` int NULL, `physicalActivityFrecuencyId` int NULL, PRIMARY KEY (`physicalActivityUserId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`userId` int NOT NULL AUTO_INCREMENT, `role` varchar(255) NOT NULL DEFAULT 'student', `email` varchar(255) NULL, `username` varchar(255) NOT NULL, `age` int NOT NULL, `height` int NOT NULL, `weight` int NOT NULL, `createAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleteAt` datetime(6) NULL, `genderId` int NULL, UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`userId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `score_users` (`scoreUserId` int NOT NULL AUTO_INCREMENT, `score` int NOT NULL, `createAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleteAt` datetime(6) NULL, `userId` int NULL, `playerId` int NULL, `gameId` int NULL, PRIMARY KEY (`scoreUserId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `games` (`gameId` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `createAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleteAt` datetime(6) NULL, PRIMARY KEY (`gameId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `passwords` ADD CONSTRAINT `FK_be52d650dd1061422ea756bbc2f` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `physical_activity_users` ADD CONSTRAINT `FK_01b0035d478e0c6650aebf2e437` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `physical_activity_users` ADD CONSTRAINT `FK_14c6906a0a05aa4504bb703d57c` FOREIGN KEY (`physicalActivityId`) REFERENCES `physical_activities`(`pyshicalActivityId`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `physical_activity_users` ADD CONSTRAINT `FK_df64b2fbf620b030179e4e9d25f` FOREIGN KEY (`physicalActivityFrecuencyId`) REFERENCES `physical_activity_frecuency`(`physicalActivityFrecuencyId`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_cf6706b7fc5f8847430a1c468d3` FOREIGN KEY (`genderId`) REFERENCES `genders`(`genderId`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `score_users` ADD CONSTRAINT `FK_037878f8df3e20f347c3936d208` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `score_users` ADD CONSTRAINT `FK_7c918920e740c342cab79f93241` FOREIGN KEY (`playerId`) REFERENCES `users`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `score_users` ADD CONSTRAINT `FK_81614641946a27e2d04348226ce` FOREIGN KEY (`gameId`) REFERENCES `games`(`gameId`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `score_users` DROP FOREIGN KEY `FK_81614641946a27e2d04348226ce`");
        await queryRunner.query("ALTER TABLE `score_users` DROP FOREIGN KEY `FK_7c918920e740c342cab79f93241`");
        await queryRunner.query("ALTER TABLE `score_users` DROP FOREIGN KEY `FK_037878f8df3e20f347c3936d208`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_cf6706b7fc5f8847430a1c468d3`");
        await queryRunner.query("ALTER TABLE `physical_activity_users` DROP FOREIGN KEY `FK_df64b2fbf620b030179e4e9d25f`");
        await queryRunner.query("ALTER TABLE `physical_activity_users` DROP FOREIGN KEY `FK_14c6906a0a05aa4504bb703d57c`");
        await queryRunner.query("ALTER TABLE `physical_activity_users` DROP FOREIGN KEY `FK_01b0035d478e0c6650aebf2e437`");
        await queryRunner.query("ALTER TABLE `passwords` DROP FOREIGN KEY `FK_be52d650dd1061422ea756bbc2f`");
        await queryRunner.query("DROP TABLE `games`");
        await queryRunner.query("DROP TABLE `score_users`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `physical_activity_users`");
        await queryRunner.query("DROP TABLE `physical_activity_frecuency`");
        await queryRunner.query("DROP TABLE `physical_activities`");
        await queryRunner.query("DROP TABLE `genders`");
        await queryRunner.query("DROP TABLE `passwords`");
    }

}
