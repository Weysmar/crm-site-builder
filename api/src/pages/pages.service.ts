import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PagesService {
  constructor(private readonly prisma: PrismaService) { }

  create(createPageDto: CreatePageDto) {
    return this.prisma.page.create({
      data: {
        title: createPageDto.title,
        slug: createPageDto.slug,
        content: createPageDto.content,
        seoTitle: createPageDto.seoTitle,
        seoDesc: createPageDto.seoDesc,
        keywords: createPageDto.keywords,
        site: {
          connect: { id: createPageDto.siteId },
        },
      },
    });
  }

  findAll() {
    return this.prisma.page.findMany({
      include: { site: true },
    });
  }

  findOne(id: string) {
    return this.prisma.page.findUnique({
      where: { id },
      include: { site: true },
    });
  }

  update(id: string, updatePageDto: UpdatePageDto) {
    return this.prisma.page.update({
      where: { id },
      data: updatePageDto,
    });
  }

  remove(id: string) {
    return this.prisma.page.delete({
      where: { id },
    });
  }
}
