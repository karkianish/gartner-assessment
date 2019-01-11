import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tagForm: FormGroup;
  tags = [];
  @Input() options = ['acct', 'bat'];

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  showErrorMessage = false;
  showDuplicateMsg = false;

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$).pipe(
      map(term => (term === '' ? this.options
        : this.options.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.tagForm = this.fb.group({
      tagInput: '',
    });
  }

  onKeyUp(event: KeyboardEvent) {
    this.showDuplicateMsg = false;
    this.showErrorMessage = false;
    const pressedEnterKey = event.keyCode === 13;
    if (pressedEnterKey) {
      const ctrl = this.tagForm.get('tagInput');
      if (this.options.indexOf(ctrl.value) === -1) {
        this.showErrorMessage = true;
      } else if (this.tags.indexOf(ctrl.value) > -1) {
        this.showDuplicateMsg = true;
      } else {
        this.tags.push(ctrl.value);
        ctrl.reset();
      }
    }
  }

  onRemoveTagClicked(tagname: string): void {
    this.tags = this.tags.filter(tag => tag !== tagname);
  }
}
