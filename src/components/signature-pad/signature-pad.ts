import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'signature-pad',
  templateUrl: 'signature-pad.html'
})
export class SignaturePadComponent {
  @Input() signature;
  @Output() onChangeEmitter = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onSignatureChange() {console.log('change');
    this.updateSignature();
  }

  updateSignature() {
    this.onChangeEmitter.emit(this.signature);
  }
}
