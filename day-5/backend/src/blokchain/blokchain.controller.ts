import { Controller, Get } from '@nestjs/common';
import { BlockchainService } from './blokchain.service'; //

@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {} //

  @Get('value')
  async getValue() {
    return this.blockchainService.getLatestValue();
  }

  @Get('events')
  async getEvents() {
    return this.blockchainService.getValueUpdatedEvents();
  }
}
