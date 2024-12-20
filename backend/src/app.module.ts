import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';




@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule available globally
    }),
    // TypeORM configuration
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // useFactory: (configService: ConfigService) => ({
      //   type: 'postgres',
      //   host: configService.get<string>('DATABASE_HOST'),
      //   port: configService.get<number>('DATABASE_PORT'),
      //   username: configService.get<string>('DATABASE_USERNAME'),
      //   password: configService.get<string>('DATABASE_PASSWORD'),
      //   database: configService.get<string>('DATABASE_NAME'),
      //   entities: [User],
      //   synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
      //   logging: configService.get<boolean>('TYPEORM_LOGGING'),
      // }),
      useFactory: (configService: ConfigService) => {
        const databaseHost = configService.get<string>('DB_HOST');
        const databasePort = configService.get<number>('DB_PORT');
        const databaseUsername = configService.get<string>('DB_USER');
        const databasePassword = configService.get<string>('DB_PASS');
        const databaseName = configService.get<string>('DB_NAME');
        const synchronize = configService.get<boolean>('TYPEORM_SYNCHRONIZE');
        const logging = configService.get<boolean>('TYPEORM_LOGGING');

        // for debug only!
        // console.log('ENV_VALUE:', ENV_VALUE);

        return {
          type: 'postgres',
          host: databaseHost,
          port: databasePort,
          username: databaseUsername,
          password: databasePassword,
          database: databaseName,
          entities: [User],
          synchronize,
          logging,
        };
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UserModule } from './user/user.module';
// import { User } from './user/entities/user.entity';

// @Module({
//   imports: [TypeOrmModule.forRoot({
    
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     password: 'test',
//     username: 'postgres',
//     entities: [User],
//     database: 'pgWithNest',
//     synchronize: true,
//     logging: true,
//   }), 
//   UserModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
