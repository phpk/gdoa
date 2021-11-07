import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ADMIN_PREFIX } from 'src/modules/admin/admin.constants';

export function setupSwagger(app: INestApplication): void {
  const configService: ConfigService = app.get(ConfigService);

  // 默认为启用
  const enable = configService.get<boolean>('swagger.enable', true);

  // 判断是否需要启用
  if (!enable) {
    return;
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get<string>('swagger.title'))
    .setDescription(configService.get<string>('swagger.desc'))
    .setLicense('MIT', 'https://godo.im')
    .setVersion('0.0.1')
    .addServer('http://127.0.0.1:3000')
    // JWT鉴权
    .addSecurity(ADMIN_PREFIX, {
      description: '后台管理接口授权',
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
    })
    .addTag('登录模块')
    .addTag('账户模块')
    .addTag('管理员模块')
    .addTag('角色模块')
    .addTag('菜单权限模块')
    .addTag('部门模块')
    .addTag('日志模块')
    .addTag('任务调度模块')
    .addTag('在线用户模块')
    .addTag('参数配置模块')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(
    configService.get<string>('swagger.path', '/apidoc'),
    app,
    document,
  );
}
