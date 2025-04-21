import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  UUIDV4,
} from 'sequelize';
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/v1/user/entities/user.model';

@Table({
  paranoid: true,
})
export class Candidate extends Model<
  InferAttributes<Candidate>,
  InferCreationAttributes<Candidate>
> {
  /** Foreign Key to User ID */
  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, defaultValue: UUIDV4, primaryKey: true })
  id: CreationOptional<string>;

  @BelongsTo(() => User)
  declare user: User;

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
