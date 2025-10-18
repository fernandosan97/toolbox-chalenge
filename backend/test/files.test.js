const chai = require('chai');
const expect = chai.expect;
const nock = require('nock');
const request = require('supertest');

const app = require('../src/app');

describe('Files API', () => {
  const API_BASE = 'https://echo-serv.tbxnet.com';

  afterEach(() => nock.cleanAll());

  it('should return list from /files/list', async () => {
    nock(API_BASE)
      .get('/v1/secret/files')
      .reply(200, { files: ['file1.csv', 'file2.csv'] });

    const res = await request(app).get('/files/list');
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ files: ['file1.csv', 'file2.csv'] });
  });

  it('should return parsed data from /files/data', async () => {
    nock(API_BASE)
      .get('/v1/secret/files')
      .reply(200, { files: ['file1.csv'] });

    const csv = 'file,text,number,hex\nfile1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765\nfile1.csv,d,6173,f9e1bcdb9e3784acc448af34f4727252\n';

    nock(API_BASE)
      .get('/v1/secret/file/file1.csv')
      .reply(200, csv);

    const res = await request(app).get('/files/data');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('file', 'file1.csv');
    expect(res.body[0].lines).to.be.an('array');
    expect(res.body[0].lines[0]).to.deep.equal({
      text: 'RgTya',
      number: 64075909,
      hex: '70ad29aacf0b690b0467fe2b2767f765'
    });
  });

  it('should support fileName query param', async () => {
    nock(API_BASE)
      .get('/v1/secret/files')
      .reply(200, { files: ['a.csv', 'b.csv'] });

    const csvA = 'file,text,number,hex\na.csv,one,1,aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n';
    nock(API_BASE).get('/v1/secret/file/a.csv').reply(200, csvA);
    nock(API_BASE).get('/v1/secret/file/b.csv').reply(200, '');

    const res = await request(app).get('/files/data').query({ fileName: 'a.csv' });
    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(1);
    expect(res.body[0].file).to.equal('a.csv');
  });
});
