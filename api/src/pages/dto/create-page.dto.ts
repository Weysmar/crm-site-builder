import { IsNotEmpty, IsOptional, IsString, IsUUID, IsJSON, IsArray } from 'class-validator';

export class CreatePageDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    slug: string;

    @IsNotEmpty()
    content: any; // Allow any JSON content for GrapesJS

    @IsUUID()
    @IsNotEmpty()
    siteId: string;

    @IsString()
    @IsOptional()
    seoTitle?: string;

    @IsString()
    @IsOptional()
    seoDesc?: string;

    @IsArray()
    @IsOptional()
    keywords?: string[];
}
