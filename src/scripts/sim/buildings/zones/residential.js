import { City } from "../../city.js";
import { Zone } from "./zone.js";
import { ResidentsModule } from "../modules/residents.js";
import { BuildingType } from "../buildingType.js";
import { Building } from "../building.js";

export class ResidentialZone extends Zone {
  /**
   * @type {ResidentsModule}
   */
  residents = new ResidentsModule(this);

  constructor(x, y) {
    super(x, y);
    this.name = generateResidentialBuildingName();
    this.type = BuildingType.residential;
  }

  simulate(city) {
    super.simulate(city);
    this.residents.simulate(city);
  }

  dispose() {
    this.residents.dispose();
    super.dispose();
  }

  toHTML() {
    let html = super.toHTML();
    html += this.residents.toHTML();
    return html;
  }
}

// Arrays de diferentes partes de nombres para generar nombres de edificios residenciales
const prefixes = ["Villa", "Residencial", "Condominio", "Edificio", "Torre"];
const suffixes = [
  "del Sol",
  "de la Luna",
  "de los Pinos",
  "de la Playa",
  "de la Ciudad",
];

// Funcion para generar un nombre aleatorio de edificio residencial
function generateResidentialBuildingName() {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  return `${prefix} ${suffix}`;
}
