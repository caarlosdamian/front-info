
export const sortInfo = (array1, array2) => {
  let falseCount, trueCount;
  const sortData = {};
  let percent = 0;
  array1.map((incident) => {
    falseCount = 0;
    trueCount = 0;
    array2.map((info) => {
      if (info[incident] === true) {
        trueCount += 1;
      } else if (info[incident] === false) {
        falseCount += 1;
      }
    });
    percent =
      falseCount === 0 && trueCount === 0
        ? 0
        : ((falseCount)/ (falseCount + trueCount)*100).toFixed(1);
    sortData[incident] = {
      false: falseCount,
      true: trueCount,
      percent: percent,
    };
  });
  return sortData;
};

