//{CODE:ACS02}
// di.core.angular.controls.modal
define(function () {
    'use strict';

    return function (module) {
        var util = $di.utility.util;

        module.controller('ModalController', ModalController);

        ModalController.$inject = ['$scope', '$element', 'translator', 'options', 'close'];

        function ModalController($scope, $element, translator, options, close) {
            var vm = this;
            vm.changed = false;

            vm.title = undefined;
            vm.save = "SAVE";
            vm.cancel = "CANCEL";
            vm.model = {};
            vm.original = {};
            vm.onDropdownChanged = onDropdownChanged;
            vm.onDataChanged = onDataChanged;
            vm.onSave = onSave;
            vm.onPrompt = onPrompt;
            vm.onCancel = onCancel;

            init();

            return;

            function init() {
                vm.model = _.clone(options.dataModel);
                vm.original = _.clone(options.dataModel);

                translator.whenReady().then(function () {
                    if (util.isDefined(options.title)) {
                        vm.title = translator.instantTranslate(options.title);
                    }

                    vm.save = translator.instantTranslate(options.save || "SAVE");
                    vm.cancel = translator.instantTranslate(options.cancel || "CANCEL");
                });
            }

            function onDropdownChanged(item) {
                vm.model[options.dropdownName] = item;

                onDataChanged()
            }

            function onDataChanged() {
                vm.changed = true;

                if (options.onDataChanged) {
                    options.onDataChanged();
                }
            }

            function onSave() {
                $element.modal('hide');
                close({
                    state: 'saved',
                    object: vm.model
                },
	                500);
            }

            function onPrompt() {
                if (options.onPrompt) {
                    options.onPrompt();
                }
            }

            function onCancel() {
                vm.changed = false;
                $element.modal('hide');

                close({
                    state: 'cancelled',
                    object: vm.original
                }, 500);
            }

        }

        return ModalController;
    };
});