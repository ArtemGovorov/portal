"use strict";
var ModalControllerBase = (function () {
    function ModalControllerBase($element, promptWindow, options, close) {
        this.$element = $element;
        this.promptWindow = promptWindow;
        this.options = options;
        this.close = close;
        this.onDataChanged = this.onDataChanged.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
        this.model = _.clone(this.options.dataModel);
        this.original = _.clone(this.options.dataModel);
        this.changed = false;
        this.defaultCancelPromptOptions = {
            title: 'EINVOICING.COMPONENTS.NAVIGATION.ABANDON_CHANGES_WARNING.TITLE',
            message: 'EINVOICING.COMPONENTS.NAVIGATION.ABANDON_CHANGES_WARNING.MESSAGE',
            okBtnText: 'CORE.PROMPT.YES',
            cancelBtnText: 'CORE.PROMPT.NO'
        };
    }
    ModalControllerBase.prototype.onDataChanged = function () {
        this.changed = true;
        if (this.options.onDataChanged) {
            this.options.onDataChanged(this.model);
        }
    };
    ModalControllerBase.prototype.onSave = function () {
        this.$element.modal('hide');
        this.close({
            state: 'saved',
            object: this.model
        }, 500);
    };
    ModalControllerBase.prototype.onDelete = function () {
        this.$element.modal('hide');
        this.close({
            state: 'deleted',
            object: this.model
        }, 500);
    };
    ModalControllerBase.prototype.onPrompt = function (action) {
        if (this.options.onPrompt && this.options.onPrompt[action]) {
            this.options.onPrompt[action]();
        }
    };
    ModalControllerBase.prototype.onCancel = function () {
        if (this.options.promptOnCancel && this.changed) {
            this.promptCancel(this.closeWindow);
        }
        else {
            this.closeWindow();
        }
    };
    ModalControllerBase.prototype.closeWindow = function () {
        this.$element.modal('hide');
        this.close({
            state: 'cancelled',
            object: this.original
        }, 500);
    };
    ModalControllerBase.prototype.promptCancel = function (onConfirmed) {
        var options = {
            title: this.options.cancelPromptTitle,
            message: this.options.cancelPromptMessage,
            okBtnText: this.options.cancelPromptOkBtnText,
            cancelBtnText: this.options.cancelPromptCancelBtnText,
            callback: function (result) {
                if (result) {
                    onConfirmed();
                }
            }
        };
        _.defaults(options, this.defaultCancelPromptOptions);
        this.promptWindow.confirm(options);
    };
    return ModalControllerBase;
}());
exports.ModalControllerBase = ModalControllerBase;
