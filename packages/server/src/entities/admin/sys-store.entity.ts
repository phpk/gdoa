import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';
/**
 * 门店表
 */
@Entity({ name: 'sys_store' })
export default class SysStore extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'store_id', comment: '门店id' })
    @ApiProperty()
    storeId: number;

    @Column({ name: 'company_id', comment: '公司id' })
    @ApiProperty()
    companyId: number;

    @Column({ comment: '门店名称' })
    @ApiProperty()
    name: string;

    @Column({ comment: '地址' })
    @ApiProperty()
    address: string;

    @Column({ nullable: true, default: 0, comment: '上级id' })
    @ApiProperty()
    parentId: number;

    @Column({ type: 'tinyint', default: 0, comment: '类型' })
    @ApiProperty()
    type: number;

    @Column({ type: 'tinyint', default: 0, comment: '状态' })
    @ApiProperty()
    status: number;

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

    @Column({ name: 'user_id', comment: '创建用户id' })
    @ApiProperty()
    userId: number;
}
