import { Component } from "@angular/core";
import { MenubarModule } from "primeng/menubar";
import { InputNumberModule } from "primeng/inputnumber";
import { CardModule } from "primeng/card";
import { ButtonModule } from "primeng/button";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { InputMaskModule } from "primeng/inputmask";

@Component({
  selector: "app-home",
  imports: [
    FormsModule,
    MenubarModule,
    InputNumberModule,
    CardModule,
    ButtonModule,
    CommonModule,
    InputMaskModule,
  ],
  templateUrl: "./home.component.html",
  styles: ``,
})
export class HomeComponent {
  maskValues: string[] = ["", ""];
  hourlyRate: number | null = null;
  holidayRate: number | null = null;
  workdayPercentage: number | null = null;
  extraHours: number | null = null;
  ferialExtraRate: number | null = null;
  holidayExtraRate: number | null = null;

  oreFerialiAnnuali: number | null = null;
  oreFestiveAnnuali: number | null = null;
  oreExtraFeriali: number | null = null;
  oreExtraFestive: number | null = null;
  differenzaOreExtra: number | null = null;
  totalAnnualCost: number | null = null;
  oreExtraFerialiAnnualCost: number | null = null;
  oreExtraFestiveAnnualCost: number | null = null;

  // Funzione per calcolare le ore annuali normali
  calcolaOreAnnuali(): void {
    if (
      this.maskValues[0] &&
      this.maskValues[1] &&
      this.hourlyRate &&
      this.holidayRate
    ) {
      const feriali = this.calcolaOreGiornaliere(this.maskValues[0]);
      const festive = this.calcolaOreGiornaliere(this.maskValues[1]);

      this.oreFerialiAnnuali = feriali * 260;
      this.oreFestiveAnnuali = festive * 104;

      // Calcola il costo annuale totale (feriali + festive)
      this.totalAnnualCost =
        this.oreFerialiAnnuali * this.hourlyRate +
        this.oreFestiveAnnuali * this.holidayRate;
    }
  }

  // Funzione per calcolare le ore extra
  calcolaOreExtraPerPercentuale(): void {
    if (
      this.extraHours !== null &&
      this.workdayPercentage !== null &&
      this.ferialExtraRate !== null &&
      this.holidayExtraRate !== null
    ) {
      const oreExtraFeriali = (this.extraHours * this.workdayPercentage) / 100;
      const oreExtraFestive = this.extraHours - oreExtraFeriali;

      this.oreExtraFeriali = oreExtraFeriali;
      this.oreExtraFestive = oreExtraFestive;

      // Calcola il costo annuale per le ore extra
      this.oreExtraFerialiAnnualCost =
        oreExtraFeriali * 260 * this.ferialExtraRate;
      this.oreExtraFestiveAnnualCost =
        oreExtraFestive * 104 * this.holidayExtraRate;

      // Calcola la differenza tra le ore extra
      this.differenzaOreExtra = oreExtraFeriali - oreExtraFestive;
    }
  }

  // Funzione di supporto per calcolare le ore giornaliere
  private calcolaOreGiornaliere(ore: string): number {
    const [start, end] = ore.split(" - ").map((o) => parseInt(o, 10));
    return end - start;
  }
}
