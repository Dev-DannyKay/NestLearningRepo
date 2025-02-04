
import { IsOptional, IsInt, Min, IsPositive } from 'class-validator';

export class PaginationDto {
//   @IsOptional()
//   @IsInt()
//   @Min(1)
//   page?: number = 1; 

//   @IsOptional()
//   @IsInt()
//   @Min(1)
//   limit?: number = 10; 

@IsInt({ message: 'page must be an integer number' })
@IsPositive({ message: 'page must not be less than 1' })
page: number;

@IsInt({ message: 'limit must be an integer number' })
@IsPositive({ message: 'limit must not be less than 1' })
limit: number;
}
