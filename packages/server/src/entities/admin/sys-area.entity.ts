import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';
/**
 * 系统地区表
 */
@Entity({ name: 'sys_area' })
export default class SysArea extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'area_id', comment: '地区id' })
    @ApiProperty()
    areaId: number;

    @Column({ name: 'parent_id', nullable: true, comment: '上级id' })
    @ApiProperty()
    parentId: number;

    @Column({ comment: '地区名称' })
    @ApiProperty()
    name: string;

    @Column({ type: 'text', nullable: true, comment: '所有的下级' })
    @ApiProperty()
    sun: string;

    @Column({ nullable: true, comment: '路径' })
    @ApiProperty()
    path: string;

    @Column({ type: 'tinyint', default: 0, comment: '类型0禁用1可用' })
    @ApiProperty()
    status: number;


    @Column({ name: 'order_num', type: 'int', default: 0, nullable: true, comment: '排序' })
    @ApiProperty()
    orderNum: number;

    @Column({ name: 'user_id', comment: '创建用户id' })
    @ApiProperty()
    userId: number;

}
