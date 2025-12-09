namespace App {
  interface FieldConfig {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
  }

  export class Validate {
    constructor(public fieldConfig: FieldConfig) {}

    isValid() {
      let isValid = true;
      const { value, required, minLength, maxLength, minValue, maxValue } =
        this.fieldConfig;

      if (required) {
        isValid = isValid && String(value).trim().length !== 0;
      }

      if (minLength != null && typeof value === "string") {
        isValid = isValid && value.length > minLength;
      }

      if (maxLength != null && typeof value === "string") {
        isValid = isValid && value.length < maxLength;
      }

      if (minValue != null && typeof value === "number") {
        isValid = isValid && value > minValue;
      }

      if (maxValue != null && typeof value === "number") {
        isValid = isValid && value < maxValue;
      }

      return isValid;
    }
  }
}
