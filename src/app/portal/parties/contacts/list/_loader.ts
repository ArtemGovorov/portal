import { provide } from 'ng-metadata/core';

import { ContactListComponent } from './index';

export function load(module) {
    module.directive(...provide(ContactListComponent));
}