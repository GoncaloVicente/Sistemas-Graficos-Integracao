var cena = new THREE.Scene();

var camara = new THREE.PerspectiveCamera( 70, 800/600, 0.1, 500);
camara.position.x = 0;
camara.position.y = 0;
camara.position.z = 50;
camara.lookAt(0,0,0);

var janela = document.getElementById( 'Canvas' );
var renderer = new THREE.WebGLRenderer({canvas: janela});
renderer.setSize(800, 600);

var controlos = new THREE.OrbitControls( camara, renderer.domElement );

var pontoLuz1 = new THREE.PointLight("white");
pontoLuz1.position.set( 0, 15, 35 );
pontoLuz1.castShadow = true;
cena.add( pontoLuz1 );

var pontoLuz2 = new THREE.PointLight("white");
pontoLuz2.position.set( -0, 15, -35 );
pontoLuz2.castShadow = true;
cena.add( pontoLuz2 );

var light = new THREE.AmbientLight( "white" ); 

var saia = null;
var corIniSaia = null;

var carregador = new THREE.GLTFLoader();
carregador.load( '3D/Saia/Saia.gltf',
 function ( gltf ) {
 cena.add( gltf.scene )
    
    saia = cena.getObjectByName('Saia');
    corIniSaia = saia.material.color;
    
 renderer.render(cena,camara)
 }
)

var menu = document.getElementById('menu_loop');
document.getElementById('cores').style.display="block";

menu.value = "1";

menu.addEventListener('change',verificar);
function verificar (){
	
    if(menu.value == "1"){
        document.getElementById('cores').style.display="block";
        document.getElementById('vistas').style.display="none";        
        document.getElementById('iluminacao').style.display="none";
    }
	if(menu.value == "2"){
        document.getElementById('cores').style.display="none";
        document.getElementById('vistas').style.display="block";
        document.getElementById('iluminacao').style.display="none";
    }
    if(menu.value == "3"){
        document.getElementById('cores').style.display="none";
        document.getElementById('vistas').style.display="none";
        document.getElementById('iluminacao').style.display="block";
    }
	
}

document.getElementById('btn_text').addEventListener('click',textura);
function textura (){
    
    saia.material.color = corIniSaia;
    
}

document.getElementById('btn_blue').addEventListener('click',verde);
function verde (){
	
    saia.material.color = new THREE.Color('deepskyblue');
             
}

document.getElementById('btn_frente').addEventListener('click',frente);
function frente (){
	
    camara.position.x = 0;
    camara.position.y = 0;
    camara.position.z = 50;
    camara.lookAt(0,0,0);

}

document.getElementById('btn_tras').addEventListener('click',tras);
function tras (){
	
    camara.position.x = 0;
    camara.position.y = 0;
    camara.position.z = -50;
    camara.lookAt(0,0,0);

}

var slide_pre = document.getElementById('controlo_intensidade_pre');
var valor_pre = document.getElementById('valor_pre');
slide_pre.value = 1;
slide_pre.min = 0;
slide_pre.max = 8;
slide_pre.step = 0.1;

slide_pre.addEventListener('input',intensidadeLuz_pre)
function intensidadeLuz_pre (){
	
    valor_pre.innerHTML = slide_pre.value;
    pontoLuz1.intensity = slide_pre.value;
    pontoLuz2.intensity = slide_pre.value;
    
}

var slide_am = document.getElementById('controlo_intensidade_ambiente');
var valor_am = document.getElementById('valor_ambiente');
slide_am.value = 1;
slide_am.min = 0;
slide_am.max = 8;
slide_am.step = 0.1;

slide_am.addEventListener('input',intensidadeLuz_am)
function intensidadeLuz_am (){
	
    valor_am.innerHTML = slide_am.value;
    light.intensity = slide_am.value;
    
}

document.getElementById('btn_base').addEventListener('click',base);
function base (){
	
    cena.remove( light );
    document.getElementById('luzAmbiente').style.display="none";
    
}

document.getElementById('btn_ambiente').addEventListener('click',ambiente);
function ambiente (){
	
    cena.add(light);
    document.getElementById('luzAmbiente').style.display="block";
    slide_am.value = 1;
    valor_am.innerHTML = slide_am.value;
    light.intensity = slide_am.value;
    
}


document.getElementById('btn_branco').addEventListener('click',branco);
function branco (){
	
    pontoLuz1.color = new THREE.Color("white");
    pontoLuz2.color = new THREE.Color("white");
    light.color = new THREE.Color("white");
    
}

document.getElementById('btn_azul').addEventListener('click',azul);
function azul (){
	
    pontoLuz1.color = new THREE.Color("greenyellow");
    pontoLuz2.color = new THREE.Color("greenyellow");
    light.color = new THREE.Color("greenyellow");
    
}

animar()
function animar() {
 requestAnimationFrame( animar );
 renderer.render( cena, camara );
}

