import * as THREE from "three";
// 導入軌道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//導入動畫庫
import gsap from "gsap";

//04目標: 紋理常用屬性

// 1. 創建場景
const scene = new THREE.Scene();

//2. 創建相機
const camera = new THREE.PerspectiveCamera(
  75, //角度
  window.innerWidth / window.innerHeight, //寬高比
  0.1, //近端
  1000 //遠端
);

//3. 設置相機位置
camera.position.set(0, 0, 10);
scene.add(camera);

//03. 導入紋理
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/御門疆.jpg");
const materials = [
  new THREE.MeshBasicMaterial({ color: '#b0b0b0', map: textureLoader.load("./textures/御門疆1.jpg") }),
  new THREE.MeshBasicMaterial({ color: '#b0b0b0', map: textureLoader.load("./textures/御門疆2.jpg") }),
  new THREE.MeshBasicMaterial({ color: '#b0b0b0', map: textureLoader.load("./textures/御門疆3.jpg") }),
  new THREE.MeshBasicMaterial({ color: '#b0b0b0', map: textureLoader.load("./textures/御門疆4.jpg") }),
  new THREE.MeshBasicMaterial({ color: '#b0b0b0', map: textureLoader.load("./textures/御門疆5.jpg") }),
  new THREE.MeshBasicMaterial({ color: '#b0b0b0', map: textureLoader.load("./textures/御門疆6.jpg") })
];

//04. 設置 紋理[偏移]
// doorColorTexture.offset.x = 1;
// doorColorTexture.offset.set(0.5,0.5)
//04.設置 紋理[旋轉]
//設置旋轉的原點
// doorColorTexture.center.set(0.5, 0.5);
//旋轉45deg
// doorColorTexture.rotation = Math.PI / 4;
//04.設置 紋理[重複]
// doorColorTexture.repeat.set(2,3)
// 設置 紋理[重複]的模式
// doorColorTexture.wrapS = THREE.MirroredRepeatWrapping
// doorColorTexture.wrapT = THREE.RepeatWrapping

//4. 添加物體
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 材質
const basicMaterial = new THREE.MeshBasicMaterial({
  color:'#b0b0b0',
  map: doorColorTexture,
});



const cube = new THREE.Mesh(cubeGeometry, materials);
scene.add(cube);

// 6. 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 設置渲染器尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

//7.將webgl 渲染的canvas內容添加到body
document.body.appendChild(renderer.domElement);

//8.使用渲染器, 通過相機將場景渲染進來
renderer.render(scene, camera);

// 02. 創建 軌道控制器
const controls = new OrbitControls(camera, renderer.domElement);
//設置控制器的阻尼, 讓控制器更有真實感, 必須在動畫循環調用.update()
controls.enableDamping = true;

// 添加坐標軸輔助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render() {
  controls.update();
  renderer.render(scene, camera);
  //渲染下一幀的時候會調用render 函數
  requestAnimationFrame(render);
}

render();

//08. 監聽畫面的變化, 更新渲染畫面
window.addEventListener("resize", () => {
  //   console.log("畫面變化了");
  //更新攝像頭
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新攝影機的投影矩陣
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerHeight, window.innerHeight);

  //設置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
