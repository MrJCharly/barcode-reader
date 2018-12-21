import { Component, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'draw-signature-pad',
  templateUrl: 'signature-pad.html'
})
export class SignaturePadComponent implements AfterViewInit {
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

  ionViewDidLoad() {
    this.clear();
  }

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

  ngAfterViewInit() {
    this.signaturepad.clear();
    this.canvasResize();
  }

  canvasResize() {
    let canvas = document.querySelector('canvas');

    //this.signaturepad.set('minWidth', 1);
    this.signaturepad.set('canvasWidth', canvas.offsetWidth);
    this.signaturepad.set('canvasHeight', canvas.offsetHeight);
  }

}
