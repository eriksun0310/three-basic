import * as THREE from "three";
// 導入軌道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//04目標: 設置3D物體的縮放與旋轉

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

//4. 添加物體
//創建幾何體
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
//材質
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xfff00 });

// Mesh網格: 根據幾何體和材質創建物體
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

//04. 縮放
// cube.scale.set(3,2,1)
//兩種都可
// cube.scale.x = 5

// 04. 旋轉(XYZ)先旋轉哪個軸
// cube.rotation.set(Math.PI / 4, 0, 0, "XYZ");

//5.將幾何體添加到場景當中
scene.add(cube);

// 6. 初始化渲染器
const renderer = new THREE.WebGLRenderer();

// 設置渲染器尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
console.log("renderer", renderer);

//7.將webgl 渲染的canvas內容添加到body
document.body.appendChild(renderer.domElement);

//8.使用渲染器, 通過相機將場景渲染進來
renderer.render(scene, camera);

// 02. 創建 軌道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐標軸輔助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render() {
  //03 修改物體的位置
  cube.position.x += 0.01;
  // 04. 旋轉
  cube.rotation.x += 0.01;
  if (cube.position.x > 5) {
    cube.position.x = 0;
  }
  // cube.position.y+=0.01
  renderer.render(scene, camera);
  //渲染下一幀的時候會調用render 函數
  requestAnimationFrame(render);
}

render();
