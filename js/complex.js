function initArary(kinds) {
  let arr = [];
  for (let a = 0; a <= kinds[0]; a++) arr[a] = [];
  for (let a = 0; a <= kinds[0]; a++)
    for (let b = 0; b <= kinds[1]; b++) arr[a][b] = [];
  for (let a = 0; a <= kinds[0]; a++)
    for (let b = 0; b <= kinds[1]; b++)
      for (let c = 0; c <= kinds[2]; c++) arr[a][b][c] = [];
  for (let a = 0; a <= kinds[0]; a++)
    for (let b = 0; b <= kinds[1]; b++)
      for (let c = 0; c <= kinds[2]; c++)
        for (let d = 0; d <= kinds[3]; d++) arr[a][b][c][d] = [];
  for (let a = 0; a <= kinds[0]; a++)
    for (let b = 0; b <= kinds[1]; b++)
      for (let c = 0; c <= kinds[2]; c++)
        for (let d = 0; d <= kinds[3]; d++)
          for (let e = 0; e <= kinds[4]; e++) arr[a][b][c][d][e] = [];
  for (let a = 0; a <= kinds[0]; a++)
    for (let b = 0; b <= kinds[1]; b++)
      for (let c = 0; c <= kinds[2]; c++)
        for (let d = 0; d <= kinds[3]; d++)
          for (let e = 0; e <= kinds[4]; e++)
            for (let f = 0; f <= kinds[5]; f++) arr[a][b][c][d][e][f] = [];
  for (let a = 0; a <= kinds[0]; a++)
    for (let b = 0; b <= kinds[1]; b++)
      for (let c = 0; c <= kinds[2]; c++)
        for (let d = 0; d <= kinds[3]; d++)
          for (let e = 0; e <= kinds[4]; e++)
            for (let f = 0; f <= kinds[5]; f++)
              for (let g = 0; g <= kinds[6]; g++) arr[a][b][c][d][e][f][g] = 0;

  return arr;
}

//
function calcDP(kinds, ps, num) {
  console.log(ps);
  // 初期化
  let dp = initArary(kinds);
  dp[0][0][0][0][0][0][0] = 1;

  for (let i = 0; i < num; i++) {
    let p = initArary(kinds);
    // 初期化
    // 遷移
    for (let a = 0; a <= kinds[0]; a++) {
      for (let b = 0; b <= kinds[1]; b++) {
        for (let c = 0; c <= kinds[2]; c++) {
          for (let d = 0; d <= kinds[3]; d++) {
            for (let e = 0; e <= kinds[4]; e++) {
              for (let f = 0; f <= kinds[5]; f++) {
                for (let g = 0; g <= kinds[6]; g++) {
                  const now = dp[a][b][c][d][e][f][g];
                  // aが出てかつ被らない
                  if (a < kinds[0])
                    p[a + 1][b][c][d][e][f][g] +=
                      (now * ps[0] * (kinds[0] - a)) / kinds[0];
                  // aが出てかつ被る
                  p[a][b][c][d][e][f][g] += (now * ps[0] * a) / kinds[0];
                  if (b < kinds[1])
                    p[a][b + 1][c][d][e][f][g] +=
                      (now * ps[1] * (kinds[1] - b)) / kinds[1];
                  p[a][b][c][d][e][f][g] += (now * ps[1] * b) / kinds[1];
                  if (c < kinds[2])
                    p[a][b][c + 1][d][e][f][g] +=
                      (now * ps[2] * (kinds[2] - c)) / kinds[2];
                  p[a][b][c][d][e][f][g] += (now * ps[2] * c) / kinds[2];
                  if (d < kinds[3])
                    p[a][b][c][d + 1][e][f][g] +=
                      (now * ps[3] * (kinds[3] - d)) / kinds[3];
                  p[a][b][c][d][e][f][g] += (now * ps[3] * d) / kinds[3];
                  if (e < kinds[4])
                    p[a][b][c][d][e + 1][f][g] +=
                      (now * ps[4] * (kinds[4] - e)) / kinds[4];
                  p[a][b][c][d][e][f][g] += (now * ps[4] * e) / kinds[4];
                  if (f < kinds[5])
                    p[a][b][c][d][e][f + 1][g] +=
                      (now * ps[5] * (kinds[5] - f)) / kinds[5];
                  p[a][b][c][d][e][f][g] += (now * ps[5] * f) / kinds[5];
                  if (g < kinds[6])
                    p[a][b][c][d][e][f][g + 1] +=
                      (now * ps[6] * (kinds[6] - g)) / kinds[6];
                  p[a][b][c][d][e][f][g] += (now * ps[6] * g) / kinds[6];
                }
              }
            }
          }
        }
      }
    }
    dp = p;
  }
  console.log("dp", dp);

  return dp;
}

function calcHappy(a, b, c, d, e, f, g) {
  let happy = a * 10000001;
  happy += b * 10000000;
  happy += c * 1000000;
  happy += d * 100000;
  happy += e * 10000;
  happy += f * 1000; // gは10種類以上のこともある
  happy += g * 10; // a, b調整のため10スタート
  return happy;
}

function calcMp(kinds, dp) {
  let mp = Object();
  for (let a = 0; a <= kinds[0]; a++)
    for (let b = 0; b <= kinds[1]; b++)
      for (let c = 0; c <= kinds[2]; c++)
        for (let d = 0; d <= kinds[3]; d++)
          for (let e = 0; e <= kinds[4]; e++)
            for (let f = 0; f <= kinds[5]; f++)
              for (let g = 0; g <= kinds[6]; g++)
                mp[calcHappy(a, b, c, d, e, f, g)] = dp[a][b][c][d][e][f][g];
  return mp;
}

function calcResult(mp, mpKeys, nowKindList) {
  let yourHappy = calcHappy(...nowKindList);
  console.log(yourHappy);
  let ret = 0;
  // 自分より運がいい値を足す
  for (key of mpKeys) {
    if (key == yourHappy) break;
    ret += mp[key];
  }
  return [ret, ret + mp[yourHappy]];
}

function makeInputForm(defo) {
  let inputForm = document.createElement("input");
  inputForm.type = "text";
  inputForm.value = defo;
  inputForm.className = "form-control form-control-sm";
  return inputForm;
}

window.onload = function () {
  const row = 7;
  const button = document.getElementById("compExec");
  // 計算ボタン押下時
  button.addEventListener("click", () => {
    // 値取得
    const num = parseInt(document.getElementById("num").value) || 0;
    let totalKindList = Array(row).fill(0);
    let rateList = Array(row).fill(0);
    let nowKindList = Array(row).fill(0);
    const tableRows = document.querySelector(".table").rows;
    for (let i = 1; i < row + 1; i++) {
      totalKindList[i - 1] =
        parseInt(tableRows[i].querySelector("td:nth-child(2) input").value) ||
        0;
      rateList[i - 1] =
        parseFloat(tableRows[i].querySelector("td:nth-child(3) input").value) ||
        0;
      rateList[i - 1] /= 100;
      nowKindList[i - 1] =
        parseInt(tableRows[i].querySelector("td:nth-child(4) input").value) ||
        0;
    }
    console.log(totalKindList);
    console.log(rateList);
    console.log(nowKindList);
    //
    const dp = calcDP(totalKindList, rateList, num);
    //
    const mp = calcMp(totalKindList, dp);
    mpKeys = Object.keys(mp);
    mpKeys.sort(function (a, b) {
      // 降順ソート
      if (parseInt(a) > parseInt(b)) return -1;
      else return 1;
    });
    //
    result = calcResult(mp, mpKeys, nowKindList);
    // 値表示
    document.querySelector(
      "#result"
    ).textContent = `あなたの運の良さは上位${calcParcent(
      result[0]
    )}%～${calcParcent(result[1])}%程度`;
  });

  // 浅見ゆいボタン
  const asamiButton = document.getElementById("asami");
  asamiButton.addEventListener("click", () => {
    const kindValList = Array(1, 1, 2, 3, 5, 8, 10);
    const rateValList = Array(0.2, 0.2, 1.3, 2.5, 20.4, 20.4, 55);
    const tableRows = document.querySelector(".table").rows;
    for (let i = 1; i < row + 1; i++) {
      tableRows[i].querySelector("td:nth-child(2)").textContent = "";
      tableRows[i].querySelector("td:nth-child(3) span").textContent = "";
      tableRows[i]
        .querySelector("td:nth-child(2)")
        .appendChild(makeInputForm(kindValList[i - 1]));
      tableRows[i]
        .querySelector("td:nth-child(3) span")
        .appendChild(makeInputForm(rateValList[i - 1]));
    }
  });
};
