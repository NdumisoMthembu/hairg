import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.page.html',
  styleUrls: ['./dasboard.page.scss'],
})
export class DasboardPage implements OnInit {

  constructor(private Router: Router) { }

  ngOnInit() {
  }
  goto(route) {
    this.Router.navigate([route])
  }
}
