
import * as THREE from 'three';
import {
    createGroundPlaneWired,
    createGroundPlaneXZ
} from "../libs/util/util.js";
import { buildEnemys } from './models.js';
import { Water } from './libs/Water.js';

groundandobstacles();

export function groundandobstacles(scene) {
    if(scene){
        let camera = scene.children.find(function(x){
            return x.type === 'Object3D';
        })

        let plane = scene.children.find(function(x){
            if(x.geometry){
                return x.geometry.type === 'PlaneGeometry';
            }
           
        })
        
        if (Math.round(camera.position.z) == Math.round((-500 * scene.stage)+200)) 
        {
            var tamgroundZ = 500; 
            var newplane = new THREE.PlaneGeometry(50, 500)
            var enemys = buildEnemys(scene);
            scene.add(newplane);
            removendoAntigo(scene,plane);
            scene.stage += 1; //suporte pro tamanho do novo plano em Z
            
            let water = new Water(
                newplane,
                {
                    textureWidth: 500,
                    textureHeight: 500,
                    waterNormals: new THREE.TextureLoader().load( 'assets/waternormals.jpg', function ( texture ) {
                        
                        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                        
                    } ),
                    sunDirection: new THREE.Vector3(),
                    sunColor: 0xffffff,
                    waterColor: 0x001e0f,
                    distortionScale: 3.7,
                    fog: scene.fog !== undefined
                }
                );
                
                water.position.set(0,0,((-tamgroundZ/2) * scene.stage));
                water.rotation.x = - Math.PI / 2;
    
            scene.add( water );
        }
    }
}

async function removendoAntigo(scene,oldPlane){
    await new Promise(r => setTimeout(r, 20000));
    scene.remove(oldPlane);
}









