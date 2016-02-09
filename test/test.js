var request = require('supertest');
//require = require('really-need');
describe('loading express', function() {
	var server;
	beforeEach(function() {
		//delete require.cache[require.resolve('./server')];
		//server = require('../app', { bustCache: true });
		server = require('../app');
	});
	afterEach(function() {
		server.close();
	});
	it('responds to /image', function testSlash(done) {
		request(server)
			.get('/image/iphone')
			.expect(200, done);
	});
	it('404 everything else', function testPath(done) {
		request(server)
			.get('/foo/bar')
			.expect(404, done);
	});
});