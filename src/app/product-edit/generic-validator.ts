import { FormGroup } from '@angular/forms';

/**
 * ak - 01-10-2018
 * This is a generic validator we use at our work. We learned about this from one of the pluralsight courses.
 * Although it seems overkill for this task, since the requirement had said to code for reusability, I thought
 * this may be count as a positive.
 */

export class GenericValidator {
  constructor(private validationMessages: { [ctrlName: string]: { [ruleKey: string]: string } }) {
  }

  validate(group: FormGroup): { [controlName: string]: string } {
    const formErrors = {};
    Object.keys(group.controls).forEach((ctrlName: string) => {
      const ctrl = group.get(ctrlName);
      if (ctrl instanceof FormGroup) {
        this.validate(ctrl);
      } else {
        if (ctrl && !ctrl.valid) {
          const messages = this.validationMessages[ctrlName];
          for (const ruleKey in ctrl.errors) {
            if (ruleKey) {
              if (formErrors[ctrlName]) {
                formErrors[ctrlName] += messages[ruleKey] + ' ';
              } else {
                formErrors[ctrlName] = messages[ruleKey] + ' ';
              }
            }
          }
        }
      }
    });
    return formErrors;
  }
}
