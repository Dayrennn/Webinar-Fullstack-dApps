import {
  Injectable,
  ServiceUnavailableException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { createPublicClient, http } from 'viem';
import { avalancheFuji } from 'viem/chains';
import { SIMPLE_STORAGE_ABI } from './simple-storage.abi';

@Injectable()
export class BlockchainService {
  private client;
  private contractAddress: `0x${string}`;

  constructor() {
    this.client = createPublicClient({
      chain: avalancheFuji,
      transport: http('https://api.avax-test.network/ext/bc/C/rpc', {
        timeout: 10000, // Setup timeout untuk Task 4
      }),
    });

    this.contractAddress = '0x815Eb8fB6606fae56a1c9c8d31A13fCce703787c';
  }

  // Task 2 – Read Smart Contract
  async getLatestValue() {
    try {
      const data = await this.client.readContract({
        address: this.contractAddress,
        abi: SIMPLE_STORAGE_ABI,
        functionName: 'getValue',
      });
      return {
        statusCode: 200,
        data: { value: data.toString() },
      };
    } catch (err: any) {
      this.handleRpcError(err);
    }
  }

  // Task 3 – Event Query
  async getValueUpdatedEvents() {
    try {
      const logs = await this.client.getLogs({
        address: this.contractAddress,
        event: SIMPLE_STORAGE_ABI.find((e) => e.name === 'ValueUpdated'),
        fromBlock: 50584000n, // Disesuaikan agar tidak melebihi limit 2048 blok
        toBlock: 'latest',
      });

      const formattedLogs = logs.map((log) => ({
        blockNumber: log.blockNumber?.toString() ?? null,
        value: log.args?.newValue?.toString() ?? null,
        txHash: log.transactionHash,
      }));

      return {
        statusCode: 200,
        data: formattedLogs,
      };
    } catch (err: any) {
      this.handleRpcError(err);
    }
  }

  // Task 4 – Error Handling Rapi (Helper)
  private handleRpcError(err: any) {
    // Error: Range Blok Terlalu Besar (Spesifik kasus Anda)
    if (err.message.includes('too many blocks')) {
      throw new BadRequestException({
        statusCode: 400,
        message:
          'Rentang blok terlalu besar. Maksimal pencarian adalah 2048 blok.',
        error: 'Bad Request',
      });
    }

    // Error: RPC Timeout
    if (
      err.message.includes('timeout') ||
      err.message.includes('DeadlineExceeded')
    ) {
      throw new ServiceUnavailableException({
        statusCode: 503,
        message: 'RPC timeout. Silakan coba beberapa saat lagi.',
        error: 'Service Unavailable',
      });
    }

    // Error: Network / Connection
    if (
      err.message.includes('fetch') ||
      err.message.includes('HttpRequestError')
    ) {
      throw new ServiceUnavailableException({
        statusCode: 503,
        message: 'Tidak dapat terhubung ke blockchain RPC.',
        error: 'Service Unavailable',
      });
    }

    // Error: Unknown
    throw new InternalServerErrorException({
      statusCode: 500,
      message: 'Terjadi kesalahan saat membaca data blockchain.',
      error: 'Internal Server Error',
    });
  }
}
