document.addEventListener('DOMContentLoaded', function () {
        const name =localStorage["Product name"]
        if(name){ 
            document.getElementById("output").innerHTML=name;
            for(let i=1;i<48;i++){
                document.getElementById(`output${i}`).innerHTML=name;
            }  
        }

})