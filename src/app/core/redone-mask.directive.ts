import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[redoneMask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RedoneMaskDirective,
      multi: true,
    },
  ],
})
export class RedoneMaskDirective implements ControlValueAccessor {
  onTouched: any;
  onChange: any;

  @Input() redoneMask: string = '';
  @Output() returnMask = new EventEmitter();

  constructor() {}
  writeValue(value: any): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    var value = $event.target.value.replace(/\D/g, '');
    var pad = this.redoneMask.replace(/\D/g, '').replace(/9/g, '_');
    var valueMask = value + pad.substring(0, pad.length - value.length);

    // return if pressed backspace
    if ($event.keyCode === 8) {
      this.onChange(value);
      return;
    }

    if (value.length <= pad.length) {
      this.onChange(value);
    }

    var valueMaskPos = 0;
    value = '';
    for (var i = 0; i < this.redoneMask.length; i++) {
      if (isNaN(parseInt(this.redoneMask.charAt(i)))) {
        value += this.redoneMask.charAt(i);
      } else {
        value += valueMask[valueMaskPos++];
      }
    }

    if (value.indexOf('_') > -1) {
      value = value.substr(0, value.indexOf('_'));
    }

    $event.target.value = value;
    this.returnMask.emit($event.target.value);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length === this.redoneMask.length) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
    this.returnMask.emit($event.target.value);
  }
}
