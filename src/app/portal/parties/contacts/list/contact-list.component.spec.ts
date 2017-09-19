declare var jasmine: any;

import * as ng from "angular";
import { ContactListComponent } from './contact-list.component';
import { renderFactory, IRender } from 'ng-metadata/testing';
import { bundle, getInjectableName, NgModule, Component } from 'ng-metadata/core';

describe('ContactListComponent', () => {
    let modalWindowMock = jasmine.createSpy('modalWindow');
    let translatorMock = {
        whenReady: function () {
            return new Promise();
        }
    };
    let stateParamsMock = jasmine.createSpy('stateParams');

    @NgModule({
        declarations: [ ContactListComponent ],
        providers: [
            { provide: 'modalWindow', useValue: modalWindowMock },
            { provide: 'translator', useValue: translatorMock },
            { provide: '$stateParams', useValue: stateParamsMock }
        ]
    })
    class TestNgModule { } 
    
    let $compile: ng.ICompileService;
    let $rootScope: ng.IRootScopeService;
    let $scope: ng.IScope;
    let $templateCache: ng.ITemplateCacheService;
    let render: IRender<ContactListComponent>;
    let sut: ContactListComponent;
    
    beforeEach(() => {
        const TestModule: string = bundle(TestNgModule).name;
        ng.mock.module(TestModule);
    });

    beforeEach(ng.mock.inject(function($injector: ng.auto.IInjectorService) {
        $compile = $injector.get<ng.ICompileService>('$compile');
        $rootScope = $injector.get<ng.IRootScopeService>('$rootScope');
        $scope = $rootScope.$new();
        
        render = renderFactory($compile, $scope);
        sut = render(ContactListComponent).ctrl;
    }));

    describe('$sortByChanged', () => {
        beforeEach(() => {
            sut.tableOptions = { paginationPageNumber: 3 };
        });

        it('sets paginationPageNumber to 1 on tableOptions', () => {
            sut.sortByChanged(5);
            
            expect(sut.tableOptions.paginationPageNumber).toEqual(1);
        });

        it('calls onSortByChanged on itself', () => {
            spyOn(sut.onSortByChanged, 'emit');

            let sortByValue = 4;
            
            sut.sortByChanged(sortByValue);
            
            expect(sut.onSortByChanged.emit).toHaveBeenCalledWith(sortByValue);
        });
    });
});