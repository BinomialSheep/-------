//
function calcDP(kind, num) {
  console.log("calcDP", kind, num);
  let dp = Array(kind).fill(0);
  dp[0] = 1;

  for (let i = 1; i < num; i++) {
    let p = Array(kind).fill(0);

    for (let j = 0; j < kind; j++) {
      if (j !== 0) p[j] += (dp[j - 1] * (kind - j)) / kind;
      p[j] += (dp[j] * (j + 1)) / kind;
    }
    // swap
    dp = p;
    console.log(dp);
  }
  return dp;
}

function calcResult(dp, kind, now) {
  let ret = 0;
  // 自分より運がいい値を足す
  for (let i = kind - 1; i >= now; i--) ret += dp[i];
  return [ret, ret + dp[now - 1]];
}

function calcParcent(result) {
  // 誤差がアレなので2回やる
  let ret = (Math.round(result * 10000) / 10000) * 100;
  return Math.round(ret * 1000) / 1000;
}

function makeTextResultList(dp, kind, num, ave, sd) {
  let ret = `${num}回引いた時の確率分布`;
  for (let i = 0; i < kind; i++) {
    let divi = calcDivi(i + 1, ave, sd);
    ret += `<li>${i + 1}種類：${calcParcent(dp[i])}%（偏差値${divi}）</li>`;
  }
  console.log(ret);
  return ret;
}

// 平均
function calcAve(dp, kind) {
  let ave = 0;
  for (let i = 0; i < kind; i++) {
    ave += (i + 1) * dp[i];
  }
  console.log("ave", ave);
  return ave;
}
// standard diviation（標準偏差）
function calcSD(dp, kind, ave) {
  let variant = 0; // 分散
  for (let i = 0; i < kind; i++) {
    variant += (ave - (i + 1)) * (ave - (i + 1)) * dp[i];
  }
  const sd = Math.sqrt(variant);
  console.log("sd", sd);
  return sd;
}
// 偏差値
function calcDivi(x, ave, sd) {
  const divi = (10 * (x - ave)) / sd + 50;
  return Math.round(divi * 1000) / 1000;
}

window.onload = function () {
  const button = document.getElementById("exec");

  // 計算ボタン押下時
  button.addEventListener("click", () => {
    // 値取得
    const kind = document.getElementById("total_kind").value;
    const num = document.getElementById("num").value;
    const now = document.getElementById("now_kind").value;
    //
    const dp = calcDP(parseInt(kind), parseInt(num));
    //
    const result = calcResult(dp, parseInt(kind), parseInt(now));
    console.log("result", result);
    //
    const ave = calcAve(dp, parseInt(kind));
    const sd = calcSD(dp, parseInt(kind), ave);
    // 値表示
    document.querySelector(
      "#result"
    ).textContent = `あなたの運の良さは上位${calcParcent(
      result[0]
    )}%～${calcParcent(result[1])}%程度（偏差値${calcDivi(
      parseInt(now),
      ave,
      sd
    )}）`;
    // リスト表示
    document.querySelector("#result_list").innerHTML = makeTextResultList(
      dp,
      parseInt(kind),
      parseInt(num),
      ave,
      sd
    );
  });
};
