import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  // let database: jest.Mocked<Database>;

  beforeAll(() => {
    // const { unit, unitRef } = TestBed.create(service).compile();
    // service = unit;
    // database = unitRef.get(Database);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
