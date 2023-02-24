import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductImage } from "./product-image.entity";

@Entity({name: 'products'})
export class Product {

    @ApiProperty({
        example: '1da37129-dcdd-48d2-9474-edcbab250c5d',
        description: 'Product ID',
        uniqueItems: true
        
    })

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ApiProperty({
            example: 'T-shirt Teslo',
            description: 'Product Title',
            uniqueItems: true   
    })

    @Column('text', {
        unique: true,
    })
    title: string

    @ApiProperty({        
        example: 0,
        description: 'Product Price',
    })

    @Column('float', {
        default: 0
    })
    price: number;
    
    @ApiProperty({
        example: 'lorem ipsu',
        description: 'Product Description',
        default: null
    })

    @Column({
        type:'text',
        nullable: true
    })
    description: string

    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'Product SLUG - for SEO',
        uniqueItems: true
    })

    @Column('text', {
        unique: true
    })
    slug:string

    @ApiProperty({
        example: 10,
        description: 'Product Stock',
        default: 0
    })

    @Column('int', {
        default: 0
    })
    stock:number

    @ApiProperty({
        example: ['M', 'L', 'XXL'],
        description: 'Product sizes',
    })

    @Column('text', {
        array: true
    })
    sizes: string[]

    @ApiProperty({
        example: 'women',
        description: 'Product Gender',
        default: null
    })

    @Column('text')
    gender:string

    @ApiProperty()

    @Column('text', {
        array: true,
        default:[]
    })
    tags: string[]
    
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {cascade:true, eager: true}
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        ( user ) => user.product,
        {eager: true}
    )
    user:User



    @BeforeInsert()
    checkSlugInsert(){
        if(!this.slug) {
            this.slug = this.title
        }

        this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'",'')
    }

    @BeforeUpdate()
    checkSlugUpdate(){
        this.slug = this.slug
        .toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'",'')
    }
}
