
let button = document.getElementById("button")
var option1 = document.getElementById('option1')
var option2 = document.getElementById('option2')
var option3 = document.getElementById('option3')
var option4 = document.getElementById('option4')
var option5 = document.getElementById('option5')


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let sku = request.sku
    let title = request.title
    let ShopName = request.ShopName
    let PurchasePrice = request.PurchasePrice
    let SellingPrice = request.SellingPrice

    if(request.print) {
        alert("done")
        printData = request.data;
        chrome.tabs.create(
          { url: chrome.runtime.getURL("print.html") }
        );
      }
    if (option1.checked) {
        JsBarcode("#barcode", sku)
    }
if(title){
    if (option2.checked) {
        document.getElementById("Product name").innerHTML = title
    }
}
    if (option5.checked) 
    {
       
        document.getElementById("ShopName").innerHTML="Shop name"
    }
    function name(priceEncode) {
        let pp = priceEncode
        const input = document.getElementById("encode01").getAttribute("encode")
        const inarr = []
        inarr.push(input[input.length - 1])
        for (let i = 0; i < input.length - 1; i++) {
            inarr.push(input[i])
        }
        let inputprice = []

        let value = pp.match(/(\d+)/gm)
        for (let k = 0; k < value.length; k++) {
            inputprice.push(value[k])
        }
        price01 = []
        for (let i = 0; i < inputprice.length; i++) {
            const price = inputprice[i]
            const rt = []
            for (let j = 0; j < price.length; j++) {
                const mm = inarr[price[j]]
                rt.push(mm)
            }
            let result = '';
            for (let i = 0; i < rt.length; i++) {
                result += String(rt[i]);
            }
            price01.push(result)
        }
        if (price01[1]) {
            let finalprice = price01[0].toUpperCase() + price01[1].toLowerCase()
            return finalprice
        }
        else {
            let finalprice = price01[0].toUpperCase()
            return finalprice
        }
    }
    if (PurchasePrice) {
        if(option3.checked){
        let x = name(PurchasePrice)
        document.getElementById("PurchasePrice").setAttribute('pur', x)
        }
    }

    if (SellingPrice) {
        if(option4.checked){
        let y = name(SellingPrice);
        document.getElementById("PurchasePrice").setAttribute('pur1', y)
        }
    }
    
    let aa = document.getElementById("PurchasePrice").getAttribute('pur')
    let bb =  document.getElementById("PurchasePrice").getAttribute('pur1')
    if (aa && bb) {
        let v = document.getElementById("PurchasePrice").getAttribute('pur') + '/' + document.getElementById("PurchasePrice").getAttribute('pur1')
        document.getElementById("PurchasePrice").innerHTML = v
    }
    else if(aa)
    {
        document.getElementById("PurchasePrice").innerHTML = aa

    }
    else if(bb)
    {
        document.getElementById("PurchasePrice").innerHTML = bb

    }
});


button.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrap,
    })
})

function scrap() {

    let sku = document.querySelector('div[class="item-title-subheader"]').innerText
    let title = document.querySelector('h3[class="over-flow header-title "]').innerText
    // let ShopName =document.querySelector('h3[class="over-flow header-title "]')
    let PurchasePrice = document.querySelector('div[class="group"] label[class="col-lg-9"]').innerText
    let SellingPrice = document.querySelectorAll('div[class="group"] label[class="col-lg-9"]')[3].innerText
    if(sku){ chrome.runtime.sendMessage({ sku });}
    if(title){chrome.runtime.sendMessage({ title });}
    // if(ShopName){chrome.runtime.sendMessage({ ShopName});}
    if(PurchasePrice){chrome.runtime.sendMessage({ PurchasePrice });}
    if(SellingPrice){chrome.runtime.sendMessage({ SellingPrice });}
    
    // 
    
    
}

document.addEventListener('DOMContentLoaded', function () {
    let printbutton = document.getElementById("print01")
    const elmNote = document.getElementById("Encode");
    const elmcler = document.getElementById("clear");
    const elmSave = document.getElementById("save");
    elmSave.onclick = () => {
        const elmNnote = document.getElementById("finaloutput").innerHTML
        localStorage.setItem("Product name",elmNnote)
            chrome.tabs.create({url: "createpage.html"}, tab => {});
      };
    let note = localStorage["Encode"];
    if (note == null) {
      note = "";
    }
    elmNote.value = note;
    elmcler.onclick = () => {
        localStorage["Encode"] = elmNote.value ="";
      }
    button.addEventListener('click', function () {
        localStorage["Encode"] = elmNote.value;
        var encode = document.getElementById('Encode').value
        localStorage["Encode"] = encode
        console.log(encode, "karthik")
        document.getElementById('encode01').setAttribute("encode", encode)
    })
})






