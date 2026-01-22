import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { ProjectsModule } from './projects/projects.module';
import { SitesModule } from './sites/sites.module';
import { PrismaModule } from './prisma/prisma.module';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [ClientsModule, ProjectsModule, SitesModule, PrismaModule, PagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
