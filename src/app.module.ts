import { Module } from '@nestjs/common'
import { DetailModule } from './modules/detail-page/detail.module'
import { indexModule } from './modules/index-page/index.module'
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [DetailModule, indexModule, AdminModule]
})
export class AppModule { }
