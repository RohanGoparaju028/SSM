import { Injectable, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class StoreProducts {
    constructor(private prisma: PrismaService) { }

    async storeProduct(): Promise<{ message: string, statusCode: number }> { }
}