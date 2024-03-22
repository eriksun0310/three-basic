import * as THREE from 'three'


// 01目標: 了解three.js 最基本的內容


// 1. 創建場景
const scene = new THREE.Scene()

//2. 創建相機
const camera = new THREE.PerspectiveCamera(
    75, //角度
    window.innerWidth/window.innerHeight, //寬高比
    0.1, //近端
    1000,//遠端
)

//3. 設置相機位置
camera.position.set(0,0,10)
scene.add(camera)

//4. 添加物體
//創建幾何體
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
//材質
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xfff00})

// Mesh網格: 根據幾何體和材質創建物體
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

//5.將幾何體添加到場景當中
scene.add(cube)


// 6. 初始化渲染器
const renderer = new THREE.WebGLRenderer()

// 設置渲染器尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight)
console.log('renderer', renderer)

//7.將webgl 渲染的canvas內容添加到body
document.body.appendChild(renderer.domElement)

//8.使用渲染器, 通過相機將場景渲染進來
renderer.render(scene, camera)
