/// <reference path="../../../../../../lib/di.core.test/utility/testhelper.d.ts" />
"use strict";
var contact_list_configuration_service_1 = require('./contact-list-configuration.service');
var testHelper = require("testHelper");
describe('ContactListConfigurationService', function () {
    var sut;
    testHelper.addServiceToModule(contact_list_configuration_service_1.ContactListConfigurationService, 'contactListConfigurationService');
    beforeEach(function (done) {
        testHelper.beforeEachTest();
        inject(function (contactListConfigurationService, $rootScope) {
            testHelper.setRootScope($rootScope);
            sut = contactListConfigurationService;
        });
        done();
    });
    describe('getSortOptions', function () {
        it('returns resolved promise with 10 sort options', function (done) {
            var result = sut.getSortOptions();
            testHelper.expectToResolve(result, done, function (data) {
                expect(data).toBeDefined();
                expect(data.length).toEqual(10);
            });
        });
    });
    describe('getTableOptions', function () {
        it('returns resolved promise with 5 columns', function (done) {
            var result = sut.getTableOptions();
            testHelper.expectToResolve(result, done, function (obj) {
                expect(obj).toBeDefined();
                expect(obj.columns).toBeDefined();
                expect(obj.columns.length).toEqual(5);
            });
        });
    });
});
