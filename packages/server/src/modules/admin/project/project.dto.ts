import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsString,
    MinLength,
} from 'class-validator';
export class ProjectDto {
    @ApiProperty({ description: '项目名称' })
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty({ description: '项目编号' })
    @IsString()
    @MinLength(1)
    remark: string;




}