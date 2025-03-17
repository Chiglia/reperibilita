import { Component } from "@angular/core";
import { MenubarModule } from "primeng/menubar";
import { InputNumberModule } from "primeng/inputnumber";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-home",
  imports: [MenubarModule, InputNumberModule, CardModule, ButtonModule],
  templateUrl: "./home.component.html",
  styles: ``,
})
export class HomeComponent {}
