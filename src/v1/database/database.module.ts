import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './database.service';

export default SequelizeModule.forRootAsync({
  useClass: SequelizeConfigService,
});
