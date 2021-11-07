import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import SysProjects from 'src/entities/admin/sys-projects.entity';
@ApiTags('项目模块')

@Controller('project')
export class ProjectController {
    @ApiOperation({ summary: '获取项目列表' })
    @ApiOkResponse({ type: [SysProjects] })
    @Get('list')
    async list(): Promise<[]> {
        return [];
    }
}
