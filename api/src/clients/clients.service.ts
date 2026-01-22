import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) { }

  create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({
      data: createClientDto,
    });
  }

  findAll() {
    return this.prisma.client.findMany({
      include: { projects: true },
    });
  }

  findOne(id: string) {
    return this.prisma.client.findUnique({
      where: { id },
      include: { projects: true },
    });
  }

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });
  }

  remove(id: string) {
    return this.prisma.client.delete({
      where: { id },
    });
  }
}
