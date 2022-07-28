const nomusuario = document.getElementById('usuario');
const pas = document.getElementById('pass');
const btninicio = document.getElementById('inicio');

const params={
    usuario:'',
    pass:''
};

btninicio.addEventListener('click',(e)=>{
    params.usuario = nomusuario.value;
    params.pass=pas.value;

    console.log(params);
    console.log(usuarioslogin);
    validainicio();
});

function validainicio(){
    let resultado = usuarioslogin.filter(filtraus).filter(filtrapas);
    console.log(resultado);
    if(resultado.length){
        lsAdditem("usuario",resultado[0].idusuario);
        window.location.assign("file:///C:/Users/Sistemas/Desktop/proyectoCurso/CajeroAutomatico/Menu/menu.html")
    }
    
}
function filtraus(user1) {
    if (params.usuario) {
        return user1.usuario ==params.usuario
    } 
    
}
function filtrapas(us){
    if (params.pass) {
        return us.pass ==params.pass
    }  
}
function lsAdditem(key,item){
    if (typeof item=='string') {
        localStorage.setItem(key,item)
    }else{
        localStorage.setItem(key,JSON.stringify(item))
    }
}