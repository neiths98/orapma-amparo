import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('entrou');
  }

}
