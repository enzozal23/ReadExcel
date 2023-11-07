const excelInput=document.getElementById('excel-input')
const inputCodigo= document.getElementById("codigo-busqueda")
const botonBuscar= document.getElementById("buscar")
const botonCerrar= document.querySelector("button-cerrar")
const excelEnLocal = JSON.parse(localStorage.getItem("excel"));
const botonBorrar= document.querySelector(".borrar-excel")

    class Excel{
        constructor(content){
    this.content= content
        }
        header(){
            return this.content[0]
        }
        rows(){
            return new RowCollection(this.content.slice(1,this.content.length))
        }
    }



class RowCollection{
    constructor(rows){
        this.rows=rows
    }
firts(){
    return  new Row(this.rows[0])
}
get(index){
    return new Row(this.rows[index])
}
count(){
    return this.rows.length
}
getCodigo(){
   
}
}

class Row{
    constructor(row){
        this.row=row
    }
    codigo(){
        return this.row[0]
    }
    descripcion(){
        return this.row[1]
    }
    scanner(){
        return this.row[2]
    }
    unidad(){
        return this.row[3]
    }
    precio(){
        return this.row[4]
    }
    iva(){
        return this.row[5]
    }
    precioFinal(){
        return this.row[6]
    }
}

class excelPrinter{
    static print(excel){
const mostrarCodigo= document.getElementById("codigo")
        const table = document.getElementById("excel-table")
        
        excel.header().forEach(title=>{
            table.querySelector("thead>tr").innerHTML += `<td>${title}</td>`
        })

const fragment = document.createDocumentFragment();

for (let index = 0; index < excel.rows().count(); index++) {
    const row = excel.rows().get(index);

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${row.codigo()}</td>
        <td>${row.descripcion()}</td>
        <td>${row.scanner()}</td>
        <td>${row.unidad()}</td>
        <td>${row.precio()}</td>
        <td>${row.iva()}</td>
        <td>${row.precioFinal()}</td>
    `;

    fragment.appendChild(tr);
}

const tbody = table.querySelector('tbody');
tbody.appendChild(fragment);


inputCodigo.addEventListener("change", function () {
   
    const codigoBuscado = parseInt(inputCodigo.value); 

 let filasEncontradas = [];


for (let i = 0; i < excel.rows().count(); i++) {
    const row = excel.rows().get(i);
 const scannerParceado = parseInt(row.scanner())
    if (row.codigo() === codigoBuscado||scannerParceado ===codigoBuscado) {
        filasEncontradas.push(row);
    }
    
   
}

 if (filasEncontradas.length > 0) {
    mostrarCodigo.querySelector("span").innerHTML= `<div>
    
    <div>codigo: ${filasEncontradas[0].row[0]}</div>
    <div>descripción: ${filasEncontradas[0].row[1]}</div>
    <div>scanner: ${filasEncontradas[0].row[2]}</div>
    <div>unidad: ${filasEncontradas[0].row[3]}</div>
    <div>precio sin iva: $${filasEncontradas[0].row[4]}</div>
    <div>iva: ${filasEncontradas[0].row[5]}%</div>
    <div>precio final: $${filasEncontradas[0].row[6]}
   
    </div>
    
    ` 
    mostrarCodigo.querySelector("span").classList.add("codigo")
}

else {
    mostrarCodigo.querySelector("span").innerHTML= `<div>
    no se encontro el codigo ${codigoBuscado}
  </div>
    ` 
    mostrarCodigo.querySelector("span").classList.add("codigo")
}
   

});



    }
}

const excel= new Excel(excelEnLocal)

if(excel.content){
   excelPrinter.print(excel) 
}else{
    excelInput.addEventListener('change', async function(){
const content = await readXlsxFile(excelInput.files[0])
     const excel = new Excel(content)
        
        localStorage.setItem("excel", JSON.stringify(content))
       const excelEnLocal=JSON.parse( localStorage.getItem("excel"));
        
   



    

   
    
    
    excelPrinter.print(excel);
})
}
;

botonBorrar.addEventListener("click",function(){
    localStorage.removeItem("excel");
    location.reload(true);
})



 


    

    
    
    

 







