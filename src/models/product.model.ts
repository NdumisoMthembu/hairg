import { Category } from './category.model';
import { ProductVariation } from './product.variation.model';

export interface Product {
  ProductId: string;
  CompanyId: string;
  Name: string;
  RegularPrice: number;
  PriceFrom: number;
  PriceTo: number;
  Description: string;
  ProductSlug: string;
  CatergoryId: number;
  ParentCategoryId?: number;
  CategoryName: string;
  ParentCategoryName?: string;
  FeaturedImageUrl: string;
  IsJustInTime: string;
  Notes: string;
  ProductType: string;
  Code: string;
  CreateDate?: string;
  CreateUserId: string;
  ModifyDate?: string;
  ModifyUserId: string;
  StatusId: number;
  ProductVariations?: ProductVariation[];
  Catergory?: Category;
  IsBooked?: boolean;


}
