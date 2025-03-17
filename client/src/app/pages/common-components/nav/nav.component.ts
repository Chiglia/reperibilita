import { Component } from "@angular/core";
import { MenubarModule } from "primeng/menubar";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-nav",
  imports: [MenubarModule, CardModule, ButtonModule],
  templateUrl: "./nav.component.html",
  styles: ``,
})
export class NavComponent {
  toggleTheme() {
    const element = document.querySelector("html");
    if (element) {
      element.classList.toggle("my-app-dark");
    }
  }
  menuItems = [{ label: "Home", icon: "pi pi-home", routerLink: "/" }];
}
