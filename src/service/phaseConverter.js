export function replacePhaseToNumber(phase) {
  let newPhase;

  switch (phase) {
    case "minus_3":
      newPhase = -3;
      break;
    case "minus_2_2":
      newPhase = -2.6666666666666665;
      break;
    case "minus_2_1":
      newPhase = -2.3333333333333335;
      break;
    case "minus_2_0":
      newPhase = -2;
      break;
    case "minus_1_2":
      newPhase = -1.6666666666666667;
      break;
    case "minus_1_1":
      newPhase = -1.3333333333333335;
      break;
    case "minus_1_0":
      newPhase = -1;
      break;
    case "minus_0_2":
      newPhase = -0.666666666666667;
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
    default:
      newPhase = 3;
  }
  return newPhase;
}

export function replaceNumberToPhase(number) {
  let newPhase;

  switch (number) {
    case -3:
      newPhase = "minus_3";
      break;
    case -2.6666666666666665:
      newPhase = "minus_2_2";
      break;
    case -2.3333333333333335:
      newPhase = "minus_2_1";
      break;
    case -2:
      newPhase = "minus_2_0";
      break;
    case -1.6666666666666667:
      newPhase = "minus_1_2";
      break;
    case -1.3333333333333335:
      newPhase = "minus_1_1";
      break;
    case -1:
      newPhase = "minus_1_0";
      break;
    case -0.666666666666667:
      newPhase = "minus_0_2";
      break;
    case -0.3333333333333335:
      newPhase = "minus_0_1";
      break;
    case 0:
      newPhase = "plus_0";
      break;
    case 0.33333333333333304:
      newPhase = "plus_0_1";
      break;
    case 0.6666666666666665:
      newPhase = "plus_0_2";
      break;
    case 1:
      newPhase = "plus_1_0";
      break;
    case 1.333333333333333:
      newPhase = "plus_1_1";
      break;
    case 1.666666666666666:
      newPhase = "plus_1_2";
      break;
    case 2:
      newPhase = "plus_2_0";
      break;
    case 2.333333333333333:
      newPhase = "plus_2_1";
      break;
    case 2.666666666666666:
      newPhase = "plus_2_2";
      break;
    default:
      newPhase = "plus_3";
  }
  return newPhase;
}
