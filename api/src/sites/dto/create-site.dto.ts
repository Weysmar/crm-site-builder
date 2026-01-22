import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSiteDto {
    @IsString()
    @IsOptional()
    domain?: string;

    @IsUUID()
    @IsNotEmpty()
    projectId: string;
}
