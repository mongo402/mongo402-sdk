/**
 * Query Builder - Fluent API for building MongoDB queries
 */

import type { QueryRequest, QueryOperation } from '../types';

export class QueryBuilder {
  private _operation: QueryOperation = 'find';
  private _filter: Record<string, unknown> = {};
  private _projection?: Record<string, unknown>;
  private _sort?: Record<string, 1 | -1>;
  private _limit?: number;
  private _skip?: number;
  private _pipeline?: Record<string, unknown>[];
  private _field?: string;

  /**
   * Set the operation type
   */
  operation(op: QueryOperation): this {
    this._operation = op;
    return this;
  }

  /**
   * Set filter conditions
   */
  filter(filter: Record<string, unknown>): this {
    this._filter = { ...this._filter, ...filter };
    return this;
  }

  /**
   * Add a where condition
   */
  where(field: string, value: unknown): this {
    this._filter[field] = value;
    return this;
  }

  /**
   * Add equality condition
   */
  eq(field: string, value: unknown): this {
    this._filter[field] = value;
    return this;
  }

  /**
   * Add greater than condition
   */
  gt(field: string, value: number | Date): this {
    this._filter[field] = { $gt: value };
    return this;
  }

  /**
   * Add less than condition
   */
  lt(field: string, value: number | Date): this {
    this._filter[field] = { $lt: value };
    return this;
  }


  /**
   * Add in condition
   */
  in(field: string, values: unknown[]): this {
    this._filter[field] = { $in: values };
    return this;
  }

  /**
   * Set projection (fields to include/exclude)
   */
  select(fields: Record<string, 0 | 1>): this {
    this._projection = fields;
    return this;
  }

  /**
   * Set sort order
   */
  sort(field: string, order: 'asc' | 'desc' = 'asc'): this {
    this._sort = { ...this._sort, [field]: order === 'asc' ? 1 : -1 };
    return this;
  }

  /**
   * Set limit
   */
  limit(n: number): this {
    this._limit = n;
    return this;
  }

  /**
   * Set skip (offset)
   */
  skip(n: number): this {
    this._skip = n;
    return this;
  }

  /**
   * Set aggregation pipeline
   */
  pipeline(stages: Record<string, unknown>[]): this {
    this._operation = 'aggregate';
    this._pipeline = stages;
    return this;
  }

  /**
   * Set field for distinct operation
   */
  distinct(field: string): this {
    this._operation = 'distinct';
    this._field = field;
    return this;
  }

  /**
   * Build the query request
   */
  build(): QueryRequest {
    return {
      operation: this._operation,
      filter: this._filter,
      projection: this._projection,
      sort: this._sort,
      limit: this._limit,
      skip: this._skip,
      pipeline: this._pipeline,
      field: this._field,
    };
  }
}

/**
 * Create a new query builder
 */
export function query(): QueryBuilder {
  return new QueryBuilder();
}
