import { Module } from '@nestjs/common';
import { BlockchainController } from './blokchain/blokchain.controller';
import { BlockchainService } from './blokchain/blokchain.service';

@Module({
  imports: [],
  controllers: [BlockchainController],
  providers: [BlockchainService],
})
export class AppModule {}
