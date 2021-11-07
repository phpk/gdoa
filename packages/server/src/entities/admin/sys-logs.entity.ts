import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';
/**
 * 系统日志表
 */
@Entity({ name: 'sys_logs' })
export default class SysLogs extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'logs_id', comment: '日志id' })
  @ApiProperty()
  logsId: number;

  @Column({ nullable: true, comment: '用户id' })
  @ApiProperty()
  userId: number;

  @Column({ nullable: true, comment: '请求ip' })
  @ApiProperty()
  ip: string;

  @Column({ type: 'datetime', nullable: true, comment: '请求时间' })
  @ApiProperty()
  time: Date;

  @Column({ length: 500, nullable: true, comment: '浏览器' })
  @ApiProperty()
  ua: string;

  @Column({ nullable: true, comment: '请求地址' })
  @ApiProperty()
  act: string;
}
