import { ModalResourceController } from './modal-resource.controller';
import { ModalWindowService } from './modal-window.service';

define(function () {
    'use strict';

    return function (module) {
        module.controller('ResourceController', ModalResourceController);
        module.service('modalWindow', ModalWindowService);
    };
});