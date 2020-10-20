const assert = require("chai").assert;
const addIssue = require("../Models/addIssue");
const deleteIssue = require("../Models/all.js");

describe("App",function(){
	describe("addIssue",function(){
		info = {head:"test head"};
		it("add issue should return success true on error false",function(){
			addIssue(info)
				.then(function(data){
					assert.equal(data.success,true);
				})
				.catch(function(err){
					it("add issue should return success false in case of error",function(){
						assert.equal(data.success,false);
					})
				});
		})
	})
})
