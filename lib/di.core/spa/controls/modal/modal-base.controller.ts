declare var _: any;

export class ModalControllerBase {
    public $element: any;
    public options: any;
    public close: any;
    public model: any;
    public original: any;
    public changed: boolean;
    private promptWindow: any;
    private defaultCancelPromptOptions: any;

    constructor($element, promptWindow, options, close) {
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

    onDataChanged() {
        this.changed = true;

        if (this.options.onDataChanged) {
            this.options.onDataChanged(this.model);
        }
    }

    onSave() {
        this.$element.modal('hide');
        this.close({
            state: 'saved',
            object: this.model
        },
            500);
    }

    onDelete() {
        this.$element.modal('hide');
        this.close({
            state: 'deleted',
            object: this.model
        },
            500);
    }

    onPrompt(action) {
        if (this.options.onPrompt && this.options.onPrompt[action]) {
            this.options.onPrompt[action]();
        }
    }

    onCancel() {
        if (this.options.promptOnCancel && this.changed) {
            this.promptCancel(this.closeWindow);
        } else {
            this.closeWindow();
        }
    }

    closeWindow() {
        this.$element.modal('hide');
        this.close({
            state: 'cancelled',
            object: this.original
        },
            500);
    }

    promptCancel(onConfirmed) {
        let options: any = {
            title: this.options.cancelPromptTitle,
            message: this.options.cancelPromptMessage,
            okBtnText: this.options.cancelPromptOkBtnText,
            cancelBtnText: this.options.cancelPromptCancelBtnText,
            callback: (result) => {
                if (result) {
                    onConfirmed();
                }
            }
        };

        _.defaults(options, this.defaultCancelPromptOptions);

        this.promptWindow.confirm(options);
    }
}