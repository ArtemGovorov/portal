//{CODE:ACS02}
import { ModalControllerBase } from './modal-base.controller';
let util = $di.utility.util;

const constants = Symbol('constants');

class ModalResourceController extends ModalControllerBase {
    constructor($q, $element, translator, promptWindow, options, close, partyProxy, elementNotifier) {
        super($element, promptWindow, options, close);
        this.$q = $q;
        this.translator = translator;
        this.promptWindow = promptWindow;
        this.partyProxy = partyProxy;
        this.elementNotifier = elementNotifier;


        this[constants] = {
            save: 'EINVOICING.PORTAL.ACTIONS.GENERAL.SAVE',
            cancel: 'EINVOICING.PORTAL.ACTIONS.GENERAL.CANCEL',
            close: 'EINVOICING.PORTAL.ACTIONS.GENERAL.CLOSE',
            remove: 'EINVOICING.PORTAL.ACTIONS.GENERAL.REMOVE'
        };

        this.onCountryChanged = this.onCountryChanged.bind(this);
        this.validateCode = this.validateCode.bind(this);
        this.validationFailed = this.validationFailed.bind(this);

        this.init();
    }

    init() {
        this.translator.whenReady().then(() => {
            if (util.isDefined(this.options.title)) {
                this.title = this.translator.instantTranslate(this.options.title);
            }

            this.save = this.translator.instantTranslate(this.options.save || this[constants].save);
            this.remove = this.translator.instantTranslate(this.options.remove || this[constants].remove);

            const cancelText = this.model.isEditable
                ? this.options.cancel || this[constants].cancel
                : this.options.close || this[constants].close;

            this.cancel = this.translator.instantTranslate(cancelText);
        });
    }

    onCountryChanged(country) {
        this.changed = true;

        if (this.options.onCountryChanged) {
            this.options.onCountryChanged(country);
        }

        this.onDataChanged();
    }

    onPreSave() {
        if (this.options.validateOnSave && this.changed) {
            this.validateCode(this.model, this.onSave);
        } else {
            this.onSave();
        }
    }

      validateCode(identifier) {

      var dataModel = {
          id: identifier.id,
          partyId: identifier.partyId,
          partyCodeType: identifier.partyCodeType,
          codeValue: identifier.code,
          schemeId: identifier.scheme.id,
          relatedPartyId: identifier.relatedParty.id
        };

      var promise = this.partyProxy.validatePartyCode(dataModel).then((result) => {
            return {
                success: result.success,
                message: result.resultData
            };
        });

        this.$q.all([promise]).then(([result]) => {
            if (result.success === false) {
                this.validationFailed(result);
            } else {
                this.onSave();
            }
        });
    }

    validationFailed(result) {
        const el = this.$element[0].querySelector('#codeValue');
        if (util.isNullOrUndefined(el) === false) {

            var notification = this.elementNotifier.error(
                result.message,
                el);

            notification.show();
        } else {
            console.log(result.message);
        }
    }

}

ModalResourceController.prototype.constructor.$inject = ['$q','$element', 'translator', 'promptWindow', 'options', 'close','partyProxy','elementNotifier'];

export { ModalResourceController }