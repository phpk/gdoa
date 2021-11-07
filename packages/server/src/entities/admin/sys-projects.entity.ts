import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
/**
 * 项目表
 */
@Entity({ name: 'sys_projects' })
export default class SysProjects {
    @PrimaryGeneratedColumn({ name: 'project_id', comment: '项目id' })
    @ApiProperty()
    projectId: number;


    @Column({ comment: '项目名称' })
    @ApiProperty()
    name: string;

    @Column({ nullable: true, default: 0, comment: '上级id' })
    @ApiProperty()
    parentId: number;


    @Column({ name: 'user_id', comment: '创建用户id' })
    @ApiProperty()
    userId: number;

    @Column({ type: 'tinyint', default: 0, comment: '项目类型' })
    @ApiProperty()
    type: number;

    @Column({ type: 'tinyint', default: 1, comment: '项目状态' })
    @ApiProperty()
    status: number;

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
