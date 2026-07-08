import * as THREE from "three";
import { Building } from "../building.js";
import { BuildingType } from "../buildingType.js";

const Side = {
  LEFT: "left",
  RIGHT: "right",
  TOP: "top",
  BOTTOM: "bottom",
};

const powerLineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

export class PowerLine extends Building {
  constructor(x, y) {
    super(x, y);
    this.type = BuildingType.powerLine;
    this.roadAccess.enabled = false;
  }

  refreshView(city) {
    let group = new THREE.Group();

    // This merge two powerline models, offset by 90 degrees
    let tower = window.assetManager.getModel(this.type, this);
    tower.rotation.y = Math.PI / 4;

    // Check which adjacent tiles are power lines
    let top =
      city.getTile(this.x, this.y - 1)?.building?.type === this.type ?? false;
    let bottom =
      city.getTile(this.x, this.y + 1)?.building?.type === this.type ?? false;
    let left =
      city.getTile(this.x - 1, this.y)?.building?.type === this.type ?? false;
    let right =
      city.getTile(this.x + 1, this.y)?.building?.type === this.type ?? false;

    group.add(tower);

    if (top) {
      this.#addLines(group, Side.TOP);
    }
    if (bottom) {
      this.#addLines(group, Side.BOTTOM);
    }
    if (left) {
      this.#addLines(group, Side.LEFT);
    }
    if (right) {
      this.#addLines(group, Side.RIGHT);
    }

    this.setMesh(group);
  }

  #addLines(group, side) {
    switch (side) {
      case Side.TOP:
        group.add(this.#createPowerLine(0.09, 0.36, -0.09, 0.09, 0.36, -0.5));
        group.add(this.#createPowerLine(-0.09, 0.36, -0.09, -0.09, 0.36, -0.5));
        break;
      case Side.BOTTOM:
        group.add(this.#createPowerLine(0.09, 0.36, 0.09, -0.09, 0.36, 0.5));
        group.add(this.#createPowerLine(-0.09, 0.36, 0.09, -0.09, 0.36, 0.5));
        break;
      case Side.LEFT:
        group.add(this.#createPowerLine(-0.09, 0.36, 0.09, -0.5, 0.36, 0.09));
        group.add(this.#createPowerLine(-0.09, 0.36, -0.09, -0.5, 0.36, -0.09));
        break;
      case Side.RIGHT:
        group.add(this.#createPowerLine(0.09, 0.36, -0.09, 0.5, 0.36, -0.09));
        group.add(this.#createPowerLine(0.09, 0.36, 0.09, 0.5, 0.36, 0.09));
        break;
    }
  }

  /**
   * Creates a new power line between the start and end points.
   * @returns
   */
  #createPowerLine(x1, y1, z1, x2, y2, z2) {
    const points = [
      new THREE.Vector3(x1, y1, z1),
      new THREE.Vector3(x2, y2, z2),
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const powerLine = new THREE.Line(geometry, powerLineMaterial);

    // Layer 1 so it doesn't interact with ratycaster
    powerLine.layers.set(1);
    return powerLine;
  }
}
