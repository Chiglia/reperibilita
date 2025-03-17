import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavComponent } from "./pages/common-components/nav/nav.component";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, NavComponent],
  templateUrl: "./app.component.html",

  styles: [],
})
export class AppComponent {
  title = "client";
}
