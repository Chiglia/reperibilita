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
  coefficienteFestivo: number | null = null;
  workdayPercentage: number | null = null;
  extraHours: number | null = null;
  ferialExtraRate: number | null = null;
  coefficienteFestivoExtra: number | null = null;
  durataReperibilita: number | null = null;
  repMensile: number | null = null;
  totRep: number | null = null;

  totalAnnualCost: number | null = null;
  costoTotAnnuale: number | null = null;

  // Funzione per calcolare le ore annuali normali
  calcolaOreAnnuali(): void {
    if (
      this.maskValues[0] &&
      this.maskValues[1] &&
      this.hourlyRate &&
      this.coefficienteFestivo &&
      this.extraHours !== null &&
      this.workdayPercentage !== null &&
      this.ferialExtraRate !== null &&
      this.coefficienteFestivoExtra !== null &&
      this.durataReperibilita !== null
    ) {
      const feriali = this.calcolaOreGiornaliere(this.maskValues[0]) * 260;
      const festive = this.calcolaOreGiornaliere(this.maskValues[1]) * 104;

      const holidayRate = this.hourlyRate * this.coefficienteFestivo;
      const holidayExtraRate =
        this.ferialExtraRate * this.coefficienteFestivoExtra;

      // Calcola il costo annuale totale (feriali + festive)
      this.totalAnnualCost = feriali * this.hourlyRate + festive * holidayRate;

      const oreExtraFeriali = (this.extraHours * this.workdayPercentage) / 100;
      const oreExtraFestive = this.extraHours - oreExtraFeriali;

      const totFeriale = feriali - oreExtraFeriali;
      const totFestivo = festive - oreExtraFestive;

      this.costoTotAnnuale =
        oreExtraFeriali * this.ferialExtraRate +
        oreExtraFestive * holidayExtraRate +
        totFeriale * this.hourlyRate +
        totFestivo * holidayRate;

      this.repMensile = this.costoTotAnnuale / 12;

      this.totRep = this.repMensile * this.durataReperibilita;
    }
  }

  // Funzione di supporto per calcolare le ore giornaliere
  private calcolaOreGiornaliere(ore: string): number {
    const [start, end] = ore.split(" - ").map((o) => parseInt(o, 10));
    return end - start;
  }
}
