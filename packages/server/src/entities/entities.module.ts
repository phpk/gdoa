import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import SysConfig from './admin/sys-config.entity';
import SysConfigCate from './admin/sys-config-cate.entity';
import SysUser from './admin/sys-user.entity';
import SysRole from './admin/sys-role.entity';
import SysRoleMenu from './admin/sys-role-menu.entity';
import SysDepartment from './admin/sys-department.entity';
import SysUserRole from './admin/sys-user-role.entity';
import SysLogs from './admin/sys-logs.entity';
import SysMenu from './admin/sys-menu.entity';
import SysTask from './admin/sys-task.entity';
import SysTaskLog from './admin/sys-task-log.entity';
import SysGroup from './admin/sys-group.entity';
import SysCompany from './admin/sys-company.entity';
import SysStore from './admin/sys-store.entity';
import SysArea from './admin/sys-area.entity';
import SysRoleDepartment from './admin/sys-role-department.entity';
import SysLoginLog from './admin/sys-login-log.entity';

const entityList = [
  SysUser,
  SysDepartment,
  SysUserRole,
  SysMenu,
  SysRoleMenu,
  SysRole,
  SysRoleDepartment,
  SysUserRole,
  SysLoginLog,
  SysTask,
  SysTaskLog,
  SysConfig,
  SysConfigCate,
  SysLogs,
  SysGroup,
  SysCompany,
  SysStore,
  SysArea
];

@Module({
  imports: [
    TypeOrmModule.forFeature(entityList),
  ],
  exports: [
    TypeOrmModule.forFeature(entityList),
  ],
})
export class EntityModule { }
