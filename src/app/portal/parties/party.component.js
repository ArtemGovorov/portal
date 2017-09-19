"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var util = $di.utility.util;
var core_1 = require('ng-metadata/core');
var shared_1 = require('./locations/shared');
var shared_2 = require('./contacts/shared');
var party_code_handler_service_1 = require('./party-codes/shared/party-code-handler.service');
var PartyComponent = (function () {
    function PartyComponent(locationHandlerService, contactHandlerService, partyCodeHandlerService, stateParams, $q, notificationHandler, userRightsRepository, diState, partyProxy, listsParamsStore) {
        this.locationHandlerService = locationHandlerService;
        this.contactHandlerService = contactHandlerService;
        this.partyCodeHandlerService = partyCodeHandlerService;
        this.stateParams = stateParams;
        this.$q = $q;
        this.notificationHandler = notificationHandler;
        this.userRightsRepository = userRightsRepository;
        this.diState = diState;
        this.partyProxy = partyProxy;
        this.listsParamsStore = listsParamsStore;
        this.displayErrorNotification = this.displayErrorNotification.bind(this);
    }
    PartyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.partyId = this.stateParams.id;
        this.partyName = this.stateParams.partyName;
        this.trySetPartyNameIfNotSetAsync(this.partyId, this.partyName);
        this.forPartyId = this.stateParams.forPartyId;
        this.singleDetails = this.stateParams.singleDetails;
        this.forPartyName = this.stateParams.forPartyName;
        this.trySetPartyNameIfNotSetAsync(this.forPartyId, this.forPartyName);
        var locationPromises = this.initialise(this.locationHandlerService);
        this.$q.all(locationPromises).then(function (_a) {
            var items = _a[0], tableOptions = _a[1], sortOptions = _a[2], parties = _a[3];
            _this.locations = items;
            _this.locationSortOptions = sortOptions;
            _this.locationTableOptions = tableOptions;
            _this.parties = parties;
            _this.locationListObject = {
                index: 1,
                items: items,
                parties: parties
            };
            _this.selectedLocationSortOption = _this.getSelectedOrDefault(sortOptions, _this.locationHandlerService);
        }, this.displayErrorNotification);
        var contactPromises = this.initialise(this.contactHandlerService);
        this.$q.all(contactPromises).then(function (_a) {
            var items = _a[0], tableOptions = _a[1], sortOptions = _a[2], parties = _a[3];
            _this.contacts = items;
            _this.contactSortOptions = sortOptions;
            _this.contactTableOptions = tableOptions;
            _this.parties = parties;
            _this.contactListObject = {
                index: 1,
                items: items,
                parties: parties
            };
            _this.selectedContactSortOption = _this.getSelectedOrDefault(sortOptions, _this.contactHandlerService);
        }, this.displayErrorNotification);
        var partyCodePromises = this.initialise(this.partyCodeHandlerService);
        this.$q.all(partyCodePromises).then(function (_a) {
            var items = _a[0], tableOptions = _a[1], sortOptions = _a[2], parties = _a[3];
            _this.partyCodes = items;
            _this.partyCodeSortOptions = sortOptions;
            _this.partyCodeTableOptions = tableOptions;
            _this.parties = parties;
            _this.partyCodeListObject = {
                index: 1,
                items: items,
                parties: parties
            };
        }, this.displayErrorNotification);
        this.readonly = !this.userRightsRepository.userHasRight("Supervisor");
    };
    PartyComponent.prototype.initialise = function (handlerService) {
        var savedSortOption = this.stateParams[handlerService.type + 'SortOption'];
        var sortOption = 1;
        if (savedSortOption) {
            sortOption = savedSortOption;
        }
        var promises = handlerService.init(this.partyId, this.forPartyId, sortOption);
        var partiesPromise = this.partyProxy.getPartyWithAccountingCustomers(this.partyId);
        promises.push(partiesPromise);
        return promises;
    };
    PartyComponent.prototype.getSelectedOrDefault = function (sortCollection, handlerService) {
        return _.findWhere(sortCollection, { value: this.getSortOption(handlerService) });
    };
    PartyComponent.prototype.getSortOption = function (handlerService) {
        var savedSortOption = this.stateParams[handlerService.type + 'SortOption'];
        var sortOption = 1;
        if (savedSortOption) {
            sortOption = savedSortOption;
        }
        return sortOption;
    };
    PartyComponent.prototype.addNew = function (resource, handlerService) {
        var _this = this;
        var promise = handlerService.addNewResource(resource, this.forPartyId);
        this.$q.when(promise).then(function (data) {
            if (!data) {
                _this.displayErrorNotification({ failureReason: data.message });
            }
            else {
                _this.refreshData(1, handlerService);
                _this.displaySuccessNotification('EINVOICING.PORTAL.PARTIES.ACTIONS.ADDED', handlerService.type);
            }
        }, this.displayErrorNotification);
    };
    PartyComponent.prototype.update = function (resource, handlerService) {
        var _this = this;
        var promise = handlerService.updateResource(resource, resource.id);
        this.$q.when(promise).then(function (data) {
            if (!data) {
                _this.refreshData(1, handlerService);
                _this.displayErrorNotification({ failureReason: data.message });
            }
            else {
                _this.refreshData(1, handlerService);
                _this.displaySuccessNotification('EINVOICING.PORTAL.PARTIES.ACTIONS.UPDATED', _this.titleCase(handlerService.type));
            }
        }, this.displayErrorNotification);
    };
    PartyComponent.prototype.delete = function (resource, handlerService) {
        console.log(resource, "delete");
        //let promise = handlerService.updateResource(resource, resource.id);
        //this.$q.when(promise).then((data) => {
        //        if (!data) {
        //            this.refreshData(1, handlerService);
        //            this.displayErrorNotification({ failureReason: data.message });
        //        } else {
        //            this.refreshData(1, handlerService);
        //            this.displaySuccessNotification('EINVOICING.PORTAL.PARTIES.ACTIONS.UPDATED',
        //                this.titleCase(handlerService.type));
        //        }
        //    },
        //    this.displayErrorNotification);
    };
    PartyComponent.prototype.remove = function (resource, handlerService) {
        var _this = this;
        var promise = handlerService.removeResource(resource, resource.id);
        this.$q.when(promise).then(function () {
            _this.refreshData(1, handlerService);
            _this.displaySuccessNotification('EINVOICING.PORTAL.PARTIES.ACTIONS.REMOVED', _this.titleCase(handlerService.type));
        }, this.displayErrorNotification);
    };
    PartyComponent.prototype.titleCase = function (str) {
        str = str.toLowerCase().split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        });
        return str.join(' ');
    };
    PartyComponent.prototype.refreshData = function (sortBy, handlerService) {
        var _this = this;
        var promise = handlerService.getResourceBook(this.partyId, this.forPartyId, sortBy);
        this.$q.when(promise).then(function (items) {
            if (handlerService.type === 'location') {
                _this.locations = items;
                var cloned = _.clone(_this.locationListObject);
                cloned.items = items;
                _this.locationListObject = cloned;
            }
            else if (handlerService.type === 'contact') {
                _this.contacts = items;
                var cloned = _.clone(_this.contactListObject);
                cloned.items = items;
                _this.contactListObject = cloned;
            }
        }, this.displayErrorNotification);
    };
    PartyComponent.prototype.sortByChanged = function (value, handlerService) {
        var newParams = this.listsParamsStore.get("partyDetails");
        if (!newParams) {
            newParams = [];
        }
        newParams[handlerService.type + 'SortOption'] = value;
        var params = _.extend({}, newParams);
        this.listsParamsStore.set("partyDetails", params);
        var redirectParams = _.extend({
            id: this.partyId,
            partyName: this.partyName,
            forPartyId: this.forPartyId,
            forPartyName: this.forPartyName
        }, params);
        this.diState.go(this.stateParams.ownStateName, redirectParams, { reload: true });
    };
    PartyComponent.prototype.displayErrorNotification = function (reason) {
        if (reason === void 0) { reason = {}; }
        this.notificationHandler.showError(reason.failureReason);
    };
    PartyComponent.prototype.displaySuccessNotification = function (message, identifier) {
        this.notificationHandler.showSuccess(message, identifier);
    };
    PartyComponent.prototype.backToList = function () {
        if (this.partyId === this.forPartyId) {
            this.diState.go('portal.parties.mylist');
        }
        else {
            var params = this.listsParamsStore.get("parties");
            this.diState.go('portal.parties.list', params);
        }
    };
    PartyComponent.prototype.trySetPartyNameIfNotSetAsync = function (partyIdPropertyName, partyNamePropertyName) {
        var _this = this;
        if (util.isNumber(partyIdPropertyName) && partyIdPropertyName > 0 &&
            !util.isNonEmptyString(partyNamePropertyName)) {
            this.partyProxy.get(partyIdPropertyName)
                .then(function (party) {
                partyNamePropertyName = _this.stateParams[partyNamePropertyName] = party.name;
            }, function (error) { });
        }
    };
    PartyComponent.prototype.locationSortByChanged = function (value) {
        this.sortByChanged(value, this.locationHandlerService);
    };
    PartyComponent.prototype.locationAddNew = function (resource) {
        this.addNew(resource, this.locationHandlerService);
    };
    PartyComponent.prototype.locationUpdate = function (resource) {
        this.update(resource, this.locationHandlerService);
    };
    PartyComponent.prototype.locationRemove = function (resource) {
        this.remove(resource, this.locationHandlerService);
    };
    PartyComponent.prototype.locationReloadData = function () {
        this.refreshData(1, this.locationHandlerService);
    };
    PartyComponent.prototype.contactSortByChanged = function (value) {
        this.sortByChanged(value, this.contactHandlerService);
    };
    PartyComponent.prototype.contactAddNew = function (resource) {
        this.addNew(resource, this.contactHandlerService);
    };
    PartyComponent.prototype.contactUpdate = function (resource) {
        this.update(resource, this.contactHandlerService);
    };
    PartyComponent.prototype.contactRemove = function (resource) {
        this.remove(resource, this.contactHandlerService);
    };
    PartyComponent.prototype.contactReloadData = function () {
        this.refreshData(1, this.contactHandlerService);
    };
    PartyComponent.prototype.partyCodeSortByChanged = function (value) {
        this.sortByChanged(value, this.partyCodeHandlerService);
    };
    PartyComponent.prototype.partyCodeAddNew = function (resource) {
        this.addNew(resource, this.partyCodeHandlerService);
    };
    PartyComponent.prototype.partyCodeUpdate = function (resource) {
        this.update(resource, this.partyCodeHandlerService);
    };
    PartyComponent.prototype.partyCodeDelete = function (resource) {
        this.delete(resource, this.partyCodeHandlerService);
    };
    PartyComponent.prototype.partyCodeRemove = function (resource) {
        this.remove(resource, this.partyCodeHandlerService);
    };
    PartyComponent.prototype.partyCodeReloadData = function () {
        this.refreshData(1, this.partyCodeHandlerService);
    };
    PartyComponent = __decorate([
        core_1.Component({
            selector: 'diParty',
            templateUrl: 'src/app/portal/parties/party.component.html',
            providers: [
                { provide: 'contactHandlerService', useClass: shared_2.ContactHandlerService },
                { provide: 'locationHandlerService', useClass: shared_1.LocationHandlerService },
                { provide: 'partyCodeHandlerService', useClass: party_code_handler_service_1.PartyCodeHandlerService }
            ]
        }),
        __param(0, core_1.Inject('locationHandlerService')),
        __param(1, core_1.Inject('contactHandlerService')),
        __param(2, core_1.Inject('partyCodeHandlerService')),
        __param(3, core_1.Inject('$stateParams')),
        __param(4, core_1.Inject('$q')),
        __param(5, core_1.Inject('notificationHandler')),
        __param(6, core_1.Inject('userRightsRepository')),
        __param(7, core_1.Inject('diState')),
        __param(8, core_1.Inject('partyProxy')),
        __param(9, core_1.Inject('listsParamsStore'))
    ], PartyComponent);
    return PartyComponent;
}());
exports.PartyComponent = PartyComponent;
