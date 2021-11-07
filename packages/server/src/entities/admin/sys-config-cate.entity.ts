import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';
/**
 * 系统配置分类表
 */
@Entity({ name: 'sys_config_cate' })
export default class SysConfigCate extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'cate_id', comment: '分类id' })
    @ApiProperty()
    cateId: number;

    @Column({ type: 'varchar', length: 50, comment: '名称' })
    @ApiProperty()
    name: string;

    @Column({ type: 'varchar', comment: '键值' })
    @ApiProperty()
    value: string;

    @Column({ type: 'varchar', nullable: true, comment: '标记' })
    @ApiProperty()
    remark: string;
}
