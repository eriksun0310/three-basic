import * as THREE from "three";
// 導入軌道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//06目標: clock 該對象用於跟蹤時間

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

//06.設置時鐘
const clock = new THREE.Clock();

function render() {
  //06. 獲取時鐘運行的總時長+
  let time = clock.getElapsedTime()
  //06.這幀跟下一幀 的時間差
  let deltaTime = clock.getDelta()

  //05. 這樣算位置比較準
  let t = time % 5;
  cube.position.x = t * 1;
  
  renderer.render(scene, camera);
  //渲染下一幀的時候會調用render 函數
  requestAnimationFrame(render);
}

render();
