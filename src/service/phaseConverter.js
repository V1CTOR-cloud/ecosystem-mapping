export function replacePhaseToNumber(phase) {
  let newPhase;

  switch (phase) {
    case "minus_2_0":
      newPhase = -2;
      break;
    case "minus_1_2":
      newPhase = -1.6666666666666665;
      break;
    case "minus_1_1":
      newPhase = -1.3333333333333335;
      break;
    case "minus_1_0":
      newPhase = -1;
      break;
    case "minus_0_2":
      newPhase = -0.6666666666666667;
      break;
    case "minus_0_1":
      newPhase = -0.3333333333333335;
      break;
    case "plus_0":
      newPhase = 0;
      break;
    case "plus_0_1":
      newPhase = 0.33333333333333304;
      break;
    case "plus_0_2":
      newPhase = 0.6666666666666665;
      break;
    case "plus_1_0":
      newPhase = 1;
      break;
    case "plus_1_1":
      newPhase = 1.333333333333333;
      break;
    case "plus_1_2":
      newPhase = 1.666666666666666;
      break;
    case "plus_2_0":
      newPhase = 2;
      break;
    case "plus_2_1":
      newPhase = 2.333333333333333;
      break;
    case "plus_2_2":
      newPhase = 2.666666666666666;
      break;
    case "plus_3_0":
      newPhase = 3;
      break;
    case "plus_3_1":
      newPhase = 3.333333333333333;
      break;
    case "plus_3_2":
      newPhase = 3.666666666666666;
      break;
    default:
      newPhase = 4;
      break;
  }
  return newPhase;
}

export function replaceNumberToPhase(number) {
  let newPhase;

  number = Number(number.toFixed(2));

  switch (number) {
    case -2.0:
      newPhase = "minus_2_0";
      break;
    case -1.67:
      newPhase = "minus_1_2";
      break;
    case -1.33:
      newPhase = "minus_1_1";
      break;
    case -1.0:
      newPhase = "minus_1_0";
      break;
    case -0.67:
      newPhase = "minus_0_2";
      break;
    case -0.33:
      newPhase = "minus_0_1";
      break;
    case 0.0:
      newPhase = "plus_0";
      break;
    case 0.33:
      newPhase = "plus_0_1";
      break;
    case 0.67:
      newPhase = "plus_0_2";
      break;
    case 1.0:
      newPhase = "plus_1_0";
      break;
    case 1.33:
      newPhase = "plus_1_1";
      break;
    case 1.67:
      newPhase = "plus_1_2";
      break;
    case 2.0:
      newPhase = "plus_2_0";
      break;
    case 2.33:
      newPhase = "plus_2_1";
      break;
    case 2.67:
      newPhase = "plus_2_2";
      break;
    case 3.0:
      newPhase = "plus_3_0";
      break;
    case 3.33:
      newPhase = "plus_3_1";
      break;
    case 3.67:
      newPhase = "plus_3_2";
      break;
    default:
      newPhase = "plus_4";
      break;
  }
  return newPhase;
}
