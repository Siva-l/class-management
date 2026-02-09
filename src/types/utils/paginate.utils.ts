import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

interface PaginationOptions {
  page: number;
  size: number;
}

interface PaginationResult<T> {
  results: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

async function paginateRaw<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  options: PaginationOptions,
): Promise<PaginationResult<T>> {
  const { page, size } = options;
  const offset = (page - 1) * size;

  const results = await queryBuilder.offset(offset).limit(size).getRawMany();
  const total = await queryBuilder.getCount();

  return preparePaginationResult(results, total, options);
}

async function paginate<T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  options: PaginationOptions,
): Promise<PaginationResult<T>> {
  const { page, size } = options;
  const offset = (page - 1) * size;

  const op = await queryBuilder.skip(offset).take(size).getManyAndCount();

  const [results, total] = op;
  return preparePaginationResult(results, total, options);
}

async function preparePaginationResult(
  results: any,
  total: number,
  options: PaginationOptions,
) {
  const currentPage = options.page;
  const totalPages = Math.ceil(total / options.size);

  return {
    results,
    currentPage,
    totalPages,
    totalCount: total,
  };
}

export { paginate, PaginationOptions, PaginationResult, paginateRaw };
