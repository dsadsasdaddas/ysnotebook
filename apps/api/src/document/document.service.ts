import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async create(data: { title: string; content?: string }) {
    return this.prisma.document.create({
      data: {
        title: data.title,
        content: data.content ?? null,
      },
    });
  }

  async findAll() {
    return this.prisma.document.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const document = await this.prisma.document.findUnique({
      where: { id },
    });
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  async update(id: string, data: { title?: string; content?: string }) {
    try {
      return await this.prisma.document.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.document.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
  }
}
