import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm'

@Entity()
export class Monitor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

    @Column()
    frequencyInMilliseconds: number
}
