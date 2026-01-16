import { Module } from '@nestjs/common';
import { BlockchainService } from './blokchain.service';
import { BlockchainController } from './blokchain.controller';

@Module({
  providers: [BlockchainService],
  controllers: [BlockchainController],
})
export class BlockchainModule {}
