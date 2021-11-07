import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';
/**
 * 公司表
 */
@Entity({ name: 'sys_company' })
export default class SysCompany extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'company_id', comment: '公司id' })
    @ApiProperty()
    companyId: number;


    @Column({ comment: '公司名称' })
    @ApiProperty()
    name: string;

    @Column({ nullable: true, default: 0, comment: '上级id' })
    @ApiProperty()
    parentId: number;

    @Column({ name: 'area_id', comment: '地区id' })
    @ApiProperty()
    areaId: number;

    @Column({ name: 'user_id', comment: '创建用户id' })
    @ApiProperty()
    userId: number;

    @Column({ comment: '公司地址' })
    @ApiProperty()
    address: string;

    @Column({ type: 'text', nullable: true, comment: '权限' })
    @ApiProperty()
    perms: string;

    @Column({ nullable: true, comment: '标记' })
    @ApiProperty()
    remark: string;

    @Column({ name: 'order_num', type: 'int', nullable: true, default: 0 })
    @ApiProperty()
    orderNum: number;
}
