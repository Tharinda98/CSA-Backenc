const queries=require('../../../Resolvers/Queries/Query');
const {AuthenticationError,ForbiddenError}=require('apollo-server-express');
describe("Some common Queries",()=>{
    describe("When call show Province function",()=>{
        it("should call find function in province",function (){
            const mock=jest.fn();
            const models={
                Province:{
                    find:mock
                }
            }
            queries.showProvinces({},{},{models}).then((data)=>{
                expect(mock).toHaveBeenCalled();
            })
        })
    });
    describe ("When show districts query called",()=>{
        it("should call aggregate function in district",function(){
            const mock=jest.fn();
            const models={
                District:{
                    find:mock
                }
            }
            queries.showDistricts({},{},{models}).then(()=>{
                expect(mock).toHaveBeenCalled();
            })
        })
    })
    describe("When show districts query called with pagination",()=>{
        it("should aggregate district model",function(){
            const mock=jest.fn();
            const models={
                District:{
                    find:mock
                }
            }
            queries.showDistricts_pagination({},{},{models}).then(()=>{
                expect(mock).toHaveBeenCalled();
            })
        })
    })
})
