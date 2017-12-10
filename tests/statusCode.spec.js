var request = require("request");
var base_url = "http://localhost:3000/";
var videos_url = "http://localhost:3000/videos/1";
var json_url = "http://localhost:3000/json";
var messageBody = '1';
var jsonBody = '{"first_name":"andy","last_name":"lisac"}';

describe("Backend Tests ", function() {

  describe("GET /", function() {
  
	it("should return 200 Status Code", function(done){
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });		
	});
	
    it("returns Hello World", function(done) {
      request.get(message_url, function(error, response, body) {
        expect(body).toBe(messageBody);
        done();
      });
    });
		
    it("returned JSON to equal jsonBody variable", function(done) {
      request.get(json_url, function(error, response, body) {
		console.log(body);
        expect(body).toBe(jsonBody);
        done();
      });
    });	
		
  });
   
});