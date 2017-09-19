import { ModalResourceController } from './modal-resource.controller';
import th from 'testHelper';

describe('ModalResourceController', () => {
    let sut,
        controller,
        q,
        elementMock,
        translatorMock,
        promptWindowMock,
        optionsMock,
        closeMock;

    th.injectModuleInto(ModalResourceController);
    
    beforeEach((done) => {
        th.beforeEachTest();

        elementMock = jasmine.createSpy('$element');
        translatorMock = jasmine.createSpy('translator');
        promptWindowMock = jasmine.createSpy('promptWindow');
        optionsMock = jasmine.createSpy('options');
        closeMock = jasmine.createSpy('close');
        
        inject(($rootScope, $controller, $q) => {
            th.setRootScope($rootScope);
            q = $q;
            controller = $controller;

            sut = controller('ModalResourceController as $ctrl', {
                '$element': elementMock,
                '$q': q,
                'translator': translatorMock,
                'promptWindow': promptWindowMock,
                'options': optionsMock,
                'close': closeMock
            });
        });
        done();
    });

    setupController(() =>{
        sut = controller('ModalResourceController as $ctrl', {
            '$scope': scope
        });
    });

    describe('test', () => {
        
        it('should be true', () => {
            //act
            sut.init();

            //assert
            expect(true).toEqual(true);
        });
    });
});