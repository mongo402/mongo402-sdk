import { describe, it, expect } from 'vitest';
import { QueryBuilder, query } from './query-builder';

describe('QueryBuilder', () => {
  it('should build a basic find query', () => {
    const q = query()
      .operation('find')
      .where('status', 'active')
      .limit(10)
      .build();

    expect(q.operation).toBe('find');
    expect(q.filter).toEqual({ status: 'active' });
    expect(q.limit).toBe(10);
  });

  it('should build query with multiple conditions', () => {
    const q = query()
      .eq('type', 'user')
      .gt('age', 18)
      .lt('score', 100)
      .build();

    expect(q.filter).toEqual({
      type: 'user',
      age: { $gt: 18 },
      score: { $lt: 100 },
    });
  });

  it('should build query with in condition', () => {
    const q = query()
      .in('category', ['tech', 'science', 'art'])
      .build();

    expect(q.filter).toEqual({
      category: { $in: ['tech', 'science', 'art'] },
    });
  });

  it('should build query with projection and sort', () => {
    const q = query()
      .select({ name: 1, email: 1, _id: 0 })
      .sort('createdAt', 'desc')
      .build();

    expect(q.projection).toEqual({ name: 1, email: 1, _id: 0 });
    expect(q.sort).toEqual({ createdAt: -1 });
  });

  it('should build aggregation query', () => {
    const q = query()
      .pipeline([
        { $match: { status: 'active' } },
        { $group: { _id: '$type', count: { $sum: 1 } } },
      ])
      .build();

    expect(q.operation).toBe('aggregate');
    expect(q.pipeline).toHaveLength(2);
  });

  it('should build distinct query', () => {
    const q = query()
      .distinct('category')
      .filter({ active: true })
      .build();

    expect(q.operation).toBe('distinct');
    expect(q.field).toBe('category');
    expect(q.filter).toEqual({ active: true });
  });
});
