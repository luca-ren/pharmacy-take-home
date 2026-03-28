import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy drugs", () => {
  it("should not decrease the benefit below 0", () => {
    expect(new Pharmacy([new Drug("test", 2, 0)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 0)]
    );
  });

  it("should decrease the benefit and expiresin", () => {
    expect(new Pharmacy([new Drug("test", 1, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 0, 2)]
    );
  });

  it("should decrease the benefit twice as fast once expired", () => {
    expect(new Pharmacy([new Drug("test", 0, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 1)]
    );
  });
});

describe("Pharmacy Herbal Tea", () => {
  it("should increase the benefit and decrease expiresIn", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 1, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 0, 4)]);
  });

  it("should increase the benefit twice as fast once expired", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 0, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", -1, 5)]);
  });

  it("should not increase the benefit over 50", () => {
    expect(
      new Pharmacy([new Drug("Herbal Tea", 2, 50)]).updateBenefitValue()
    ).toEqual([new Drug("Herbal Tea", 1, 50)]);
  });
});

describe("Pharmacy Magic Pill", () => {
  it("should not increase or decrease the benefit and expiresIn", () => {
    expect(
      new Pharmacy([new Drug("Magic Pill", 2, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Magic Pill", 2, 3)]);
  });
});

describe("Pharmacy Fervex", () => {
  it("should increase the benefit and decrease expiresIn", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 11, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 10, 4)]);
  });

  it("should increase the benefit twice as fast when there are 10 to 6 day till expiration and decrease expiresIn", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 10, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 9, 5)]);
  });

  it("should increase the benefit twice as fast when there are 10 to 6 day till expiration and decrease expiresIn", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 6, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 5, 5)]);
  });

  it("should increase the benefit thrice as fast when there are 5 to 1 day till expiration and decrease expiresIn", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 5, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 4, 6)]);
  });

  it("should increase the benefit thrice as fast when there are 5 to 1 day till expiration and decrease expiresIn", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 1, 3)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 0, 6)]);
  });

  it("should drop the benefit to 0 when expired", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 0, 13)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", -1, 0)]);
  });

  it("should not increase the benefit over 50", () => {
    expect(
      new Pharmacy([new Drug("Fervex", 2, 50)]).updateBenefitValue()
    ).toEqual([new Drug("Fervex", 1, 50)]);
  });
});

describe("Pharmacy Dafalgan", () => {
  it("should decrease the benefit twice as fast", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 1, 13)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", 0, 11)]);
  });

  it("should decrease the benefit four time as fast when expired", () => {
    expect(
      new Pharmacy([new Drug("Dafalgan", 0, 13)]).updateBenefitValue()
    ).toEqual([new Drug("Dafalgan", -1, 9)]);
  });
});
