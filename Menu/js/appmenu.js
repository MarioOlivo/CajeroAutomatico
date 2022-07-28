let slcuentas= document.getElementById('slcuentas');
let lbsdo=document.getElementById('lblsaldo');
let lbnom=document.getElementById('nom');
let bdp=document.getElementById('btndep');
let idusuario=0;
let cuentasusuario=[];
let datosusuario=[];

function obtenerusuario(){
    idusuario = localStorage.getItem('usuario');
    // console.log(idusuario);
    localStorage.removeItem('usuario');
    document.querySelector('#btndep').disabled = true;
    document.querySelector('#btnret').disabled = true;
    document.querySelector('#btnmov').disabled = true;
    getDatosUsuarios()

    obtenercuentas()
    cargaselect()
}
let cuentaselect;
function cargaselect(){
    let elementos ='<option value =0> Seleccione cuenta</option>'
    for (let i = 0; i < cuentasusuario.length; i++) {
        elementos += `<option value = ${cuentasusuario[i].id} > ${cuentasusuario[i].cuenta}</option>`
        
    }
    // console.log(elementos);
    slcuentas.innerHTML=elementos
}
function obtenercuentas(){
    // console.log('obtener cuentas');
    cuentasusuario = cuentas.filter((e)=>{
       return e.idusuario==idusuario;
    })
    // console.log(cuentasusuario);
}
window.onload=obtenerusuario();
slcuentas.addEventListener('change',function () {
    let valor = slcuentas.value;
    if(slcuentas.value >0){
        cuentaselect=cuentasusuario.filter((e)=>{
            return e.id ==valor;
        })
        // console.log(cuentaselect);
        lbsdo.textContent=`Saldo: ${cuentaselect[0].saldo}`
        document.querySelector('#btnmov').disabled = false;
        document.querySelector('#btndep').disabled = false;
        document.querySelector('#btnret').disabled = false;
    }else { 
            document.querySelector('#btnmov').disabled = true;
            document.querySelector('#btndep').disabled = true;
            document.querySelector('#btnret').disabled = true;
    }
})

function getDatosUsuarios(){
    datosusuario= usuario.filter(e=>{
        return e.id== idusuario;
    });
    if(datosusuario.length){
        lbnom.textContent= datosusuario[0].nombre;
    }
}
// modal de depositos
const mddepositos = document.getElementById('depositos')

const impdep = document.getElementById('importedep')
const btndeposito=document.getElementById('btndepositar')
mddepositos.addEventListener('show.bs.modal', event => {
  const button = event.relatedTarget
  const recipient = button.getAttribute('data-bs-whatever')
  const modalTitle = mddepositos.querySelector('.modal-title')
  const modalBodyInput = mddepositos.querySelector('.modal-body input')
  impdep.value=0
  modalTitle.textContent = `${recipient}`
  modalBodyInput.value = recipient
})

btndeposito.addEventListener('click',(e)=>{
    
    let imp =Number(impdep.value)
   // console.log(imp);
   validadeposito(imp)
    // console.log(cuentasusuario);
    // console.log(movimientos);
    
})
function validadeposito(impdepo){
    let imp = impdepo + cuentaselect[0].saldo
    let tpctas = tipoctas.filter((e)=>{
        return e.tipo==cuentaselect[0].idcta
    })
   // console.log(tpctas[0]);
   // console.log(cuentaselect[0]);
    if (tpctas[0].minimo<=imp && imp<=tpctas[0].maximo) {
        let date = new Date()

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        
        if(month < 10){
            fulltime=`${day}-0${month}-${year}`
        }else{
            fulltime=`${day}-${month}-${year}`
        } 
    
    let element ={
        idusuario:cuentaselect[0].idusuario,
        cuenta:cuentaselect[0].cuenta,
        tipo:'D',
        importe:impdepo,
        saldoant:cuentaselect[0].saldo,
        fecha: fulltime
    }
    movimientos.push(element)
// console.log(movimientos);
    for (let i = 0; i < cuentasusuario.length; i++) {
        if (cuentasusuario[i].id == cuentaselect[0].idusuario) {
            cuentasusuario[i].saldo=imp
            cuentaselect[0].saldo=imp
        }
    }
    lbsdo.textContent=`Saldo: ${cuentaselect[0].saldo}`
    }else{
        alert('El importe excede el máximo permitido')
        // intente utilizar el sweet alter pero no funcionó (https://sweetalert2.github.io/#download)
    }
}
//modal retiros
const impret = document.getElementById('importeret')
const btnretirar=document.getElementById('btnretirar')

const mdretiros = document.getElementById('retiros')
mdretiros.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget
    const recipient = button.getAttribute('data-bs-whatever')
    const modalTitle = mdretiros.querySelector('.modal-title')
    const modalBodyInput = mdretiros.querySelector('.modal-body input')
    impret.value=0
    modalTitle.textContent = `${recipient}`
    modalBodyInput.value = recipient
  })
  
  
  btnretirar.addEventListener('click',(e)=>{
    let imp = Number(impret.value)

   // console.log(imp);
   validaretiro(imp)
    // console.log(cuentasusuario);
    // console.log(movimientos);
    
})
function validaretiro(imp){
    let impretirar = cuentaselect[0].saldo - imp
    let tpctas = tipoctas.filter((e)=>{
        return e.tipo==cuentaselect[0].idcta
    })
    //console.log(tpctas[0]);
   // console.log(cuentaselect[0]);
    if (tpctas[0].minimo<=impretirar) {
        
    
    let element ={
        idusuario:cuentaselect[0].idusuario,
        cuenta:cuentaselect[0].cuenta,
        tipo:'R',
        importe:imp,
        saldoant:cuentaselect[0].saldo,
        fecha: Date.now()
    }
    movimientos.push(element)

    for (let i = 0; i < cuentasusuario.length; i++) {
        if (cuentasusuario[i].id == cuentaselect[0].idusuario) {
            cuentasusuario[i].saldo=impretirar
            cuentaselect[0].saldo=impretirar
        }
    }
    lbsdo.textContent=`Saldo: ${cuentaselect[0].saldo}`
    }else{
        alert('La cuenta no puede quedar con un importe menor al valor minimo segun el tipo de cuenta')
        // intente utilizar el sweet alter pero no funcionó (https://sweetalert2.github.io/#download)
    }
}

// modal de movimientos
const lbcta = document.getElementById('lbcta')
const lbsaldo = document.getElementById('lbsaldo')
const mdmov = document.getElementById('movimientos')
mdmov.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget
    const recipient = button.getAttribute('data-bs-whatever')
    const modalTitle = mdmov.querySelector('.modal-title')
    const modalBodyInput = mdmov.querySelector('.modal-body input')
    lbsaldo.textContent = `Saldo Actual ${cuentaselect[0].saldo}`
    lbcta.textContent = `Cuenta ${cuentaselect[0].cuenta}`
    modalTitle.textContent = `${recipient}`
    obtenermovimientos()
  })
  const tbmov = document.getElementById('tbmovtos')
  function obtenermovimientos() {
    // console.log('Entro a armar la tabla');
    let tbbody= 
    ` <div class="row">
        <div class="col-3">
            <p>Fecha</p>
        </div>
        <div class="col-3">
        <p>Tipo</p>
        </div>
        <div class="col-3">
        <p>Importe</p>
        </div>
        <div class="col-3">
        <p>Saldo Anterior</p>
        </div>
      </div>`

    let movtoscta = movimientos.filter((e)=>{
        return e.cuenta==cuentaselect[0].cuenta
    })
    for (let i = 0; i < movtoscta.length; i++) {
        tbbody += 
        ` <div class="row">
        <div class="col-3">
            <p>${movtoscta[i].fecha}</p>
        </div>
        <div class="col-3">
        <p>${movtoscta[i].tipo}</p>
        </div>
        <div class="col-3">
        <p>${movtoscta[i].importe}</p>
        </div>
        <div class="col-3">
        <p>${movtoscta[i].saldoant}</p>
        </div>
      </div>`
        
    }
    // console.log(tbbody);

    tbmov.innerHTML=tbbody
    
  }