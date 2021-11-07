import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
/**
 * 集团表
 */
@Entity({ name: 'sys_group' })
export default class SysGroup {
    @PrimaryGeneratedColumn({ name: 'group_id', comment: '集团id' })
    @ApiProperty()
    groupId: number;


    @Column({ comment: '集团名称' })
    @ApiProperty()
    name: string;

    @Column({ nullable: true, default: 0, comment: '上级id' })
    @ApiProperty()
    parentId: number;

    @Column({ comment: '地址' })
    @ApiProperty()
    address: string;

    @Column({ name: 'user_id', comment: '创建用户id' })
    @ApiProperty()
    userId: number;

    @Column({ name: 'area_id', comment: '地区id' })
    @ApiProperty()
    areaId: number;

    @Column({ type: 'text', nullable: true, comment: '权限' })
    @ApiProperty()
    perms: string;

    @Column({ nullable: true, comment: '标记' })
    @ApiProperty()
    remark: string;

    @Column({ name: 'order_num', comment: '排序', type: 'int', nullable: true, default: 0 })
    @ApiProperty()
    orderNum: number;

    @CreateDateColumn({ name: 'add_time', comment: '添加时间' })
    @ApiProperty()
    addTime: Date;


    @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
    @ApiProperty()
    updateTime: Date;
}
