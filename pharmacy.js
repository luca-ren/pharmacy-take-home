export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  increaseBenefit(drug, amount) {
    drug.benefit = drug.benefit + amount;
    if (drug.benefit > 50) drug.benefit = 50;
  }

  decreaseBenefit(drug, amount) {
    drug.benefit = drug.benefit - amount;
    if (drug.benefit < 0) drug.benefit = 0;
  }

  getDrugsUpdater(drug) {
    switch (drug.name) {
      case "Herbal Tea":
        return this.updateHerbalTea;
      case "Fervex":
        return this.updateFervex;
      case "Magic Pill":
        return this.updateMagicalPill;
      case "Dafalgan":
        return this.updateDafalgan;
      default:
        return this.updateNormalDrug;
    }
  }

  updateDrug(drug) {
    const updater = this.getDrugsUpdater(drug);
    updater.call(this, drug);
  }

  updateNormalDrug(drug) {
    drug.expiresIn < 1
      ? this.decreaseBenefit(drug, 2)
      : this.decreaseBenefit(drug, 1);
  }

  // do nothing if magical pill
  updateMagicalPill(drug) {}

  updateHerbalTea(drug) {
    drug.expiresIn < 1
      ? this.increaseBenefit(drug, 2)
      : this.increaseBenefit(drug, 1);
  }

  updateFervex(drug) {
    if (drug.expiresIn < 1) {
      drug.benefit = 0;
    } else if (drug.expiresIn < 6) this.increaseBenefit(drug, 3);
    else if (drug.expiresIn < 11) this.increaseBenefit(drug, 2);
    else this.increaseBenefit(drug, 1);
  }

  updateDafalgan(drug) {
    drug.expiresIn < 1
      ? this.decreaseBenefit(drug, 4)
      : this.decreaseBenefit(drug, 2);
  }

  updateBenefitValue() {
    this.drugs.forEach((drug) => {
      this.updateDrug(drug);
      if (drug.name !== "Magic Pill") {
        drug.expiresIn = drug.expiresIn - 1;
      }
    });

    return this.drugs;
  }
}
