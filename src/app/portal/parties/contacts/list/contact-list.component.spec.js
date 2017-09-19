"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ng = require("angular");
var contact_list_component_1 = require('./contact-list.component');
var testing_1 = require('ng-metadata/testing');
var core_1 = require('ng-metadata/core');
describe('ContactListComponent', function () {
    var modalWindowMock = jasmine.createSpy('modalWindow');
    var translatorMock = {
        whenReady: function () {
            return new Promise();
        }
    };
    var stateParamsMock = jasmine.createSpy('stateParams');
    var TestNgModule = (function () {
        function TestNgModule() {
        }
        TestNgModule = __decorate([
            core_1.NgModule({
                declarations: [contact_list_component_1.ContactListComponent],
                providers: [
                    { provide: 'modalWindow', useValue: modalWindowMock },
                    { provide: 'translator', useValue: translatorMock },
                    { provide: '$stateParams', useValue: stateParamsMock }
                ]
            })
        ], TestNgModule);
        return TestNgModule;
    }());
    var $compile;
    var $rootScope;
    var $scope;
    var $templateCache;
    var render;
    var sut;
    beforeEach(function () {
        var TestModule = core_1.bundle(TestNgModule).name;
        ng.mock.module(TestModule);
    });
    beforeEach(ng.mock.inject(function ($injector) {
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        render = testing_1.renderFactory($compile, $scope);
        sut = render(contact_list_component_1.ContactListComponent).ctrl;
    }));
    describe('$sortByChanged', function () {
        beforeEach(function () {
            sut.tableOptions = { paginationPageNumber: 3 };
        });
        it('sets paginationPageNumber to 1 on tableOptions', function () {
            sut.sortByChanged(5);
            expect(sut.tableOptions.paginationPageNumber).toEqual(1);
        });
        it('calls onSortByChanged on itself', function () {
            spyOn(sut.onSortByChanged, 'emit');
            var sortByValue = 4;
            sut.sortByChanged(sortByValue);
            expect(sut.onSortByChanged.emit).toHaveBeenCalledWith(sortByValue);
        });
    });
});
