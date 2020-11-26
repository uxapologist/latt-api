import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<any>;
};

// @ts-ignore
// @todo get rid of the TS error for typings of this factory (not breaking the dependant unit tests)
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((input: any): any => input),
  find: jest.fn((input: any): any => input),
  create: jest.fn((input: any): any => input),
  update: jest.fn((input: any): any => input),
  save: jest.fn((input: any): any => input),
  delete: jest.fn((input: any): any => input),
}));
