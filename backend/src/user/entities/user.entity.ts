import { Column, Entity, PrimaryGeneratedColumn  } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50})
    name: string;

    @Column({type: 'varchar', length: 50})
    username: string;

    @Column({type: 'varchar', length: 100})
    email: string

    @Column({type: 'int'})
    age: number

    @Column({type: 'varchar'})
    password: string;

    // @Column({type: 'enum', enum: ["male", "female", "non-binary", "LGBTQ+", "prefered to not identify"]})
    @Column({type: 'varchar', length: 30})
    gender: string;

}
