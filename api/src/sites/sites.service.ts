import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SitesService {
  constructor(private readonly prisma: PrismaService) { }

  create(createSiteDto: CreateSiteDto) {
    return this.prisma.site.create({
      data: {
        domain: createSiteDto.domain,
        project: {
          connect: { id: createSiteDto.projectId },
        },
      },
    });
  }

  findAll() {
    return this.prisma.site.findMany({
      include: { project: true },
    });
  }

  findOne(id: string) {
    return this.prisma.site.findUnique({
      where: { id },
      include: { project: true, pages: true },
    });
  }

  async generate(id: string) {
    const site = await this.findOne(id);
    if (!site) {
      throw new Error('Site not found');
    }
    // Mock generation process
    // In production, this would trigger the Astro build process or call a build service
    return {
      status: 'success',
      message: `Site generation triggered for domain: ${site.domain || 'untitled'}`,
      siteId: id,
      timestamp: new Date(),
    };
  }

  update(id: string, updateSiteDto: UpdateSiteDto) {
    return this.prisma.site.update({
      where: { id },
      data: updateSiteDto,
    });
  }

  remove(id: string) {
    return this.prisma.site.delete({
      where: { id },
    });
  }
}
