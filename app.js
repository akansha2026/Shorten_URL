const url = "https://tinyurl.com/api-create.php?url="

const inputRef = document.querySelector("input")
const btnRef = document.querySelector("#btn")
const copyButton = document.getElementById("copy")
const resRef = document.getElementById("second");

let disabled = false;
let copied = false;
function shortenUrl(inputRef){
    // make an Api call here to get the short url
    disabled = true;
    const responsePromise = fetch(`${url}${inputRef.value}`)
    responsePromise.then((response) =>{
        const jsonPromise = response.text();
        jsonPromise.then((data) => {
            resRef.innerHTML = `<a href=${data}>${data} </a>`
        }).catch((err) =>{
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })
}

btnRef.addEventListener("click", () => {
  if (disabled) return;
  shortenUrl(inputRef);
});

copyButton.addEventListener("click", ()=>{
    if(copied) return;
    copied = true;
    const value = resRef.innerText
    navigator.clipboard.writeText(value)
    copyButton.innerText = "Copied!"
    setTimeout(() => {
        copyButton.innerHTML = "Copy to Clipboard";
        copied = false;
    }, 3000)
})