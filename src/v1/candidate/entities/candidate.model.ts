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
export class Candidate extends Model<
  InferAttributes<Candidate>,
  InferCreationAttributes<Candidate>
> {
  @Column({ type: DataType.UUID, defaultValue: UUIDV4, primaryKey: true })
  id: CreationOptional<string>;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare isActive: CreationOptional<boolean>;

  @Column({ type: DataType.STRING })
  declare firstName: string;

  @Column({ type: DataType.STRING })
  declare lastName: string;

  @Column({ type: DataType.STRING })
  declare bio: string;

  @Column({ type: DataType.STRING })
  declare phoneNumber: string;

  @CreatedAt
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  declare updatedAt: CreationOptional<Date>;

  @DeletedAt
  declare deletedAt: CreationOptional<Date>;
}
