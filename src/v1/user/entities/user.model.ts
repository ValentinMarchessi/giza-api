import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  UUIDV4,
} from 'sequelize';
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasOne,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { Role } from 'src/v1/auth/roles.enum';
import { Candidate } from 'src/v1/candidate/entities/candidate.model';

@Table({
  paranoid: true,
})
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Column({ type: DataType.UUID, defaultValue: UUIDV4, primaryKey: true })
  id: CreationOptional<string>;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING(40))
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;

  @Column(DataType.ENUM(Role.Candidate, Role.Company))
  declare role: Role;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare isActive: CreationOptional<boolean>;

  @HasOne(() => Candidate)
  candidate: NonAttribute<Candidate>;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @DeletedAt
  declare deletedAt: CreationOptional<Date>;
}
