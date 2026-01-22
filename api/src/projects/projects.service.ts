import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) { }

  create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: createProjectDto.name,
        client: {
          connect: { id: createProjectDto.clientId },
        },
      },
    });
  }

  findAll() {
    return this.prisma.project.findMany({
      include: { sites: true, client: true },
    });
  }

  findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: { sites: true, client: true },
    });
  }

  update(id: string, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  remove(id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
