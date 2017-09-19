//{CODE:CAC0A}
let util = $di.utility.util;

class ModalWindowService {
    constructor(modalService) {
        this.modalService = modalService;
    }

    show(options, saveCallback, cancelCallback, deleteCallback) {
        this.modalService.showModal({
            templateUrl: options.templateUrl,
            controller: options.controller,
            controllerAs: options.controllerAs || '$ctrl',
            bodyClass: options.css || "custom-modal-open",
            inputs: {
                options: options
            },
            preventClose: options.preventClose || false,
            preClose: (modal) => { modal.element.modal('hide'); }
        }).then((modal) => {
            modal.element.modal();
            modal.close.then((result) => {
                switch (result.state) {
                    case 'saved':
                        if (saveCallback && util.isFunction(saveCallback)) {
                            saveCallback(result.object);
                        }
                        break;
                    case 'deleted':
                        if (deleteCallback && util.isFunction(deleteCallback)) {
                            deleteCallback(result.object);
                        }
                        break;
                    default:
                        if (cancelCallback && util.isFunction(cancelCallback)) {
                            cancelCallback(result.object);
                        }
                        break;
                }
            });
        });
    }
}

ModalWindowService.prototype.constructor.$inject = ['ModalService'];

export { ModalWindowService }