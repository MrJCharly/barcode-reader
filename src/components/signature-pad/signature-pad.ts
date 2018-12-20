import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'draw-signature-pad',
  templateUrl: 'signature-pad.html'
})
export class SignaturePadComponent {
  @Output() onSignatureChange = new EventEmitter();
  @ViewChild(SignaturePad) signaturepad: SignaturePad;
  is_drawing = false;
  options = {
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 200,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };

  constructor() {}

  onDrawStart() {
    this.is_drawing = true;
  }

  onDrawComplete() {
    this.is_drawing = false;
    this.updateSignature();
  }

  updateSignature() {
    this.onSignatureChange.emit(this.signaturepad.toDataURL());
  }

  clear() {
    this.signaturepad.clear();
    this.updateSignature();
  }
}
