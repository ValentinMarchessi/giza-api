import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  UUIDV4,
} from 'sequelize';
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { Role } from 'src/v1/auth/roles.enum';

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
  @Column(DataType.STRING(40))
  declare firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING(40))
  declare lastName: string;

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

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @DeletedAt
  declare deletedAt: CreationOptional<Date>;
}
