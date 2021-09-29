class SDPConverter {
  constructor() {
    this.data = null;
    this.val = "";
  }
  getPoint(point) {
    const arr = [
      "minus_two",
      "after_minus_two",
      "pre_minus_one",
      "minus_one",
      "after_minus_one",
      "pre_zero",
      "zero",
      "after_zero",
      "pre_one",
      "one",
      "after_one",
      "pre_two",
      "two",
      "after_two",
      "pre_three",
      "three",
      "after_three",
    ];
    const arr_num = [
      -2,
      -1.7,
      -1.3,
      -1,
      -0.7,
      -0.3,
      0,
      0.3,
      0.7,
      1,
      1.3,
      1.7,
      2,
      2.3,
      2.7,
      3,
    ];

    if (arr.includes(point)) {
      arr.forEach((i, j) => {
        if (i === point) {
          this.val = arr_num[j];
        }
      });
    } else if (arr_num.includes(point)) {
      arr_num.forEach((i, j) => {
        if (i === point) {
          this.val = arr[j];
        }
      });
    } else {
      this.val = null;
    }
    return this.val;
  }
}
export default new SDPConverter();
