import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm'

@Entity('monitors')
export class Monitors {
    @PrimaryGeneratedColumn()
    id: string

    @Column({
      length: 150
    })
    name: string

    @Column({
      length: 250
    })
    location: string
}
