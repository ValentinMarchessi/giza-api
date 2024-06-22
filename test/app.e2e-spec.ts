import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/v1', () => {
    it('GET / - Happy Path', () => {
      return request(app.getHttpServer())
        .get('/v1')
        .expect(HttpStatus.OK)
        .expect(':3');
    });
    it.todo('GET / - Error Path');
    describe('GET /db - DB Conn Health', () => {
      it('Responds 200 if connection is OK', () => {
        //Mock db init resolves

        return request(app.getHttpServer()).get('/v1/db').expect(HttpStatus.OK);
      });
      it('Responds with 500 if DB is down', () => {
        // Mock db init rejects

        return request(app.getHttpServer())
          .get('/v1/db')
          .expect(HttpStatus.INTERNAL_SERVER_ERROR);
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
