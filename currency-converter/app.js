const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const drop= document.querySelectorAll(".drop-drown  select");
let btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");






for (let select of drop) {
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        select.append(newOption);
      }
      select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
    const updateFlag = (element) => {
      let currCode = element.value;
      let countryCode = countryList[currCode];
      let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
      let img = element.parentElement.querySelector("img");
      img.src = newSrc;
    };
}
btn.addEventListener("click",async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input")
  let amtval =amount.value;
  console.log(amtval);
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amtval * rate;
  msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});




