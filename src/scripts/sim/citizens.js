import { CommercialZone } from "./buildings/zones/commercial.js";
import { IndustrialZone } from "./buildings/zones/industrial.js";
import { ResidentialZone } from "./buildings/zones/residential.js";
import config from "../config.js";

export class Citizen {
  /**
   * @param {ResidentialZone} residence
   */
  constructor(residence) {
    /**
     * Unique identifier for the citizen
     * @type {string}
     */
    this.id = crypto.randomUUID();

    /**
     * Name of this citizen
     * @type {string}
     */
    this.name = generateRandomName();

    /**
     * Age of the citizen in years
     * @type {number}
     */
    this.age = 1 + Math.floor(100 * Math.random());

    /**
     * The current state of the citizen
     * @type {'idle' | 'school' | 'employed' | 'unemployed' | 'retired'}
     */
    this.state = "idle";

    /**
     * Number of simulation steps in the current state
     */
    this.stateCounter = 0;

    /**
     * Reference to the building the citizen lives at
     * @type {ResidentialZone}
     */
    this.residence = residence;

    /**
     * Reference to the building the citizen works at
     * @type {CommercialZone | IndustrialZone}
     */
    this.workplace = null;

    this.#initializeState();
  }

  /**
   * Sets the initial state of the citizen
   */
  #initializeState() {
    if (this.age < config.citizen.minWorkingAge) {
      this.state = "school";
    } else if (this.age >= config.citizen.retirementAge) {
      this.state = "retired";
    } else {
      this.state = "unemployed";
    }
  }

  /**
   * Steps the state of the citizen forward in time by one simulation step
   * @param {object} city
   */
  simulate(city) {
    switch (this.state) {
      case "idle":
      case "school":
      case "retired":
        // Action - None

        // Transitions - None

        break;
      case "unemployed":
        // Action - Look for a job
        this.workplace = this.#findJob(city);

        // Transitions
        if (this.workplace) {
          this.state = "employed";
        }

        break;
      case "employed":
        // Actions - None

        // Transitions
        if (!this.workplace) {
          this.state = "unemployed";
        }

        break;
      default:
        console.error(
          `Citizen ${this.id} is in an unknown state (${this.state})`,
        );
    }
  }

  /**
   * Handles any clean up needed before a building is removed
   */
  dispose() {
    // Remove resident from its  workplace
    const workerIndex = this.workplace?.jobs.workers.indexOf(this);

    if (workerIndex !== undefined && workerIndex > -1) {
      this.workplace.jobs.workers.splice(workerIndex);
    }
  }

  /**
   * Search for a job nearby
   * @param {object} city
   * @returns
   */
  #findJob(city) {
    const tile = city.findTile(
      this.residence,
      (tile) => {
        // Search for an industrial or commercial building with at least one available job
        if (
          tile.building?.type === "industrial" ||
          tile.building?.type === "commercial"
        ) {
          if (tile.building.jobs.availableJobs > 0) {
            return true;
          }
        }

        return false;
      },
      config.citizen.maxJobSearchDistance,
    );

    if (tile) {
      // Employ the citizen at the building
      tile.building.jobs.workers.push(this);
      return tile.building;
    } else {
      return null;
    }
  }

  /**
   * Sets the workplace for the citizen
   * @param {CommercialZone | IndustrialZone} workplace
   */
  setWorkplace(workplace) {
    this.workplace = workplace;
  }

  /**
   * Returns an HTML representation of this object
   * @returns {string}
   */
  toHTML() {
    return `
      <li class="info-citizen">
        <span class="info-citizen-name">${this.name}</span>
        <br>
        <span class="info-citizen-details">
          <span>
            <img class="info-citizen-icon" src="/icons/calendar.png">
            ${this.age} 
          </span>
          <span>
            <img class="info-citizen-icon" src="/icons/job.png">
            ${this.state}
          </span>
        </span>
      </li>
    `;
  }
}

function generateRandomName() {
  const firstNames = [
    // Masculinos frecuentes
    "Antonio",
    "José",
    "Manuel",
    "Francisco",
    "David",
    "Juan",
    "Javier",
    "Daniel",
    "Carlos",
    "Jesús",
    "Alejandro",
    "Miguel",
    "Rafael",
    "Pedro",
    "Ángel",
    "Pablo",
    "Sergio",
    "Fernando",
    "Jorge",
    "Luis",
    "Alberto",
    "Enrique",
    "Rubén",
    "Iván",
    "Adrián",
    "Diego",
    "Mario",
    "Álvaro",
    "Hugo",
    "Lucas",
    "Martín",
    "Nicolás",
    "Marcos",
    "Gonzalo",
    "Víctor",
    "Aitor",
    "Samuel",
    "Óscar",
    "Ignacio",
    "Eduardo",
    "Raúl",
    "Roberto",
    "Andrés",
    "Guillermo",
    "Tomás",
    "Emilio",
    "Ramón",
    "Ricardo",
    "Jaime",
    "Julio",
    "Felipe",
    "Gerardo",
    "Leandro",
    "Bruno",
    "Rodrigo",
    "Iker",
    "Gael",
    "Joel",
    "Eric",
    "Héctor",
    "Cristian",
    "Gabriel",
    "Abel",
    "Ismael",
    "César",

    // Masculinos tradicionales y antiguos
    "Anselmo",
    "Aurelio",
    "Basilio",
    "Benigno",
    "Bonifacio",
    "Cándido",
    "Casimiro",
    "Ceferino",
    "Cipriano",
    "Dámaso",
    "Demetrio",
    "Desiderio",
    "Dionisio",
    "Eleuterio",
    "Eloy",
    "Evaristo",
    "Eugenio",
    "Fabián",
    "Faustino",
    "Feliciano",
    "Florencio",
    "Fructuoso",
    "Gervasio",
    "Hermenegildo",
    "Hilario",
    "Honorio",
    "Inocencio",
    "Jenaro",
    "Lorenzo",
    "Macario",
    "Melchor",
    "Narciso",
    "Nemesio",
    "Nicanor",
    "Patricio",
    "Prudencio",
    "Rogelio",
    "Saturnino",
    "Severino",
    "Teodoro",
    "Telesforo",
    "Valentín",
    "Venancio",
    "Wenceslao",
    "Zacarías",
    "Abundio",
    "Leocadio",
    "Leandro",
    "Celestino",
    "Eustaquio",
    "Marcial",
    "Silverio",
    "Teófilo",
    "Isidoro",
    "Crispín",

    // Femeninos frecuentes
    "María",
    "Carmen",
    "Ana",
    "Isabel",
    "Laura",
    "Marta",
    "Elena",
    "Sara",
    "Paula",
    "Lucía",
    "Cristina",
    "Patricia",
    "Raquel",
    "Rosa",
    "Silvia",
    "Beatriz",
    "Natalia",
    "Andrea",
    "Claudia",
    "Julia",
    "Alba",
    "Noelia",
    "Teresa",
    "Pilar",
    "Inés",
    "Sofía",
    "Valeria",
    "Emma",
    "Carla",
    "Daniela",
    "Irene",
    "Alicia",
    "Eva",
    "Mónica",
    "Verónica",
    "Nuria",
    "Lidia",
    "Esther",
    "Bárbara",
    "Susana",
    "Marina",
    "Olga",
    "Amparo",
    "Mercedes",
    "Dolores",
    "Concepción",
    "Asunción",
    "Gloria",
    "Rocío",
    "Ángela",
    "Adriana",
    "Miriam",
    "Helena",
    "Elisa",
    "Margarita",

    // Femeninos tradicionales y antiguos
    "Agustina",
    "Anastasia",
    "Antonia",
    "Ascensión",
    "Aurora",
    "Balbina",
    "Benita",
    "Caridad",
    "Casilda",
    "Celestina",
    "Consuelo",
    "Dorotea",
    "Encarnación",
    "Eulalia",
    "Eugenia",
    "Felicidad",
    "Genoveva",
    "Gregoria",
    "Herminia",
    "Josefa",
    "Leocadia",
    "Leonor",
    "Lourdes",
    "Magdalena",
    "Matilde",
    "Mercedes",
    "Milagros",
    "Petra",
    "Remedios",
    "Rosario",
    "Saturnina",
    "Teodora",
    "Trinidad",
    "Vicenta",
    "Visitación",
    "Adoración",
    "Purificación",
    "Socorro",
    "Presentación",
    "Perfecta",
    "Bernarda",
    "Catalina",
    "Clotilde",
    "Tomasa",
    "Justa",
    "Faustina",
    "Gregoria",
    "Escolástica",
    "Bibiana",
    "Petronila",
  ];

  const lastNames = [
    // Muy frecuentes
    "García",
    "Rodríguez",
    "González",
    "Fernández",
    "López",
    "Martínez",
    "Sánchez",
    "Pérez",
    "Gómez",
    "Martín",
    "Jiménez",
    "Ruiz",
    "Hernández",
    "Díaz",
    "Moreno",
    "Muñoz",
    "Álvarez",
    "Romero",
    "Alonso",
    "Gutiérrez",
    "Navarro",
    "Torres",
    "Domínguez",
    "Vázquez",
    "Ramos",
    "Gil",
    "Serrano",
    "Blanco",
    "Molina",
    "Morales",

    // Muy comunes
    "Suárez",
    "Ortega",
    "Delgado",
    "Castro",
    "Ortiz",
    "Rubio",
    "Marín",
    "Sanz",
    "Iglesias",
    "Nuñez",
    "Medina",
    "Garrido",
    "Cortés",
    "Castillo",
    "Santos",
    "Lozano",
    "Guerrero",
    "Prieto",
    "Cano",
    "Méndez",
    "Calvo",
    "Gallego",
    "León",
    "Vidal",
    "Herrera",
    "Peña",
    "Flores",
    "Cabrera",
    "Campos",
    "Vega",

    // Bastante frecuentes
    "Fuentes",
    "Carrasco",
    "Díez",
    "Reyes",
    "Caballero",
    "Nieto",
    "Aguilar",
    "Pascual",
    "Herrero",
    "Santana",
    "Lorenzo",
    "Montero",
    "Hidalgo",
    "Giménez",
    "Ibáñez",
    "Ferrer",
    "Duran",
    "Benítez",
    "Mora",
    "Vicente",
    "Santiago",
    "Crespo",
    "Soto",
    "Pastor",
    "Parra",

    // Extendidos por todo el país
    "Arias",
    "Bravo",
    "Carrillo",
    "Roldán",
    "Pardo",
    "Valero",
    "Escobar",
    "Miranda",
    "Rivera",
    "Esteban",
    "Soler",
    "Sáez",
    "Lara",
    "Moya",
    "Carmona",
    "Rivas",
    "Pons",
    "Ponce",
    "Acosta",
    "Corral",
    "Villanueva",
    "Beltrán",
    "Macias",
    "Luna",
    "Amador",

    // Tradicionales e históricos
    "Zamora",
    "Montalvo",
    "Valverde",
    "Salazar",
    "Mendoza",
    "Sandoval",
    "Montes",
    "Manrique",
    "Padilla",
    "Aranda",
    "Escudero",
    "Cervera",
    "Montoro",
    "Cuenca",
    "Arellano",
    "Alarcón",
    "Requena",
    "Velasco",
    "Castaño",
    "Cifuentes",
    "Sepúlveda",
    "Villalba",
    "Olivares",
    "Casado",
    "Palacios",

    // Norte de España
    "Aguirre",
    "Echevarría",
    "Aramburu",
    "Goikoetxea",
    "Urrutia",
    "Etxebarria",
    "Ibarra",
    "Landa",
    "Mendizábal",
    "Arostegui",
    "Ochoa",
    "Elizondo",
    "Arrieta",
    "Uribe",
    "Bengoechea",

    // Cataluña y Baleares
    "Pujol",
    "Roca",
    "Puig",
    "Vila",
    "Serra",
    "Bosch",
    "Ferrer",
    "Mas",
    "Prat",
    "Valls",
    "Amat",
    "Batlle",
    "Ribas",
    "Font",
    "Mestres",

    // Galicia
    "Pereira",
    "Seoane",
    "Carballo",
    "Lamas",
    "Varela",
    "Fariña",
    "Souto",
    "Bermúdez",
    "Freire",
    "Otero",

    // Menos frecuentes pero muy españoles
    "Barroso",
    "Cedrún",
    "Escudé",
    "Burgos",
    "Arce",
    "Márquez",
    "Redondo",
    "Benavente",
    "Barragán",
    "Toledo",
    "Palomo",
    "Coronado",
    "Ceballos",
    "Soler",
    "Vallejo",
    "Criado",
    "Soria",
    "Villena",
    "Merino",
    "Tejada",
  ];

  const randomFirstName =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return randomFirstName + " " + randomLastName;
}
