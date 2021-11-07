import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';
/**
 * 岗位表
 */
@Entity({ name: 'sys_position' })
export default class SysPosition extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'position_id', comment: '岗位id' })
    @ApiProperty()
    positionId: number;

    @Column({ nullable: true, default: 0, comment: '上级id' })
    @ApiProperty()
    parentId: number;

    @Column({ name: 'company_id', comment: '公司id' })
    @ApiProperty()
    companyId: number;

    @Column({ comment: '岗位名称' })
    @ApiProperty()
    name: string;

    @Column({ type: 'text', nullable: true, comment: '权限' })
    @ApiProperty()
    perms: string;

    @Column({ name: 'order_num', type: 'int', comment: '排序', nullable: true, default: 0 })
    @ApiProperty()
    orderNum: number;

    @Column({ nullable: true, comment: '标记' })
    @ApiProperty()
    remark: string;

}
