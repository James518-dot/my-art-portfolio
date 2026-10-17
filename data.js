// 网站的作品与联系方式统一在这里修改。以下全部为示例，不是真实艺术家履历。
// 图片放进 images 文件夹，再将 image 改为对应路径即可。
const portfolio = {
  contact: {
    email: '', // 例如：你愿意公开的邮箱；留空时显示“待填写”
    instagram: '' // 填写完整的 https://www.instagram.com/你的用户名/ 链接
  },
  works: [
    { id: '1', title: '午后的静默', year: '2024', series: '日常的切片', medium: '布面油画', size: '80 × 100 cm', image: 'images/still-life.svg', alt: '暖灰色背景中的陶罐、枝叶与水果占位插画', description: '示例描述：以静物的轮廓与柔和的色彩，探索日常物件之间的安静关系。' },
    { id: '2', title: '远山来信', year: '2024', series: '风景的记忆', medium: '布面油画', size: '100 × 80 cm', image: 'images/landscape.svg', alt: '层叠山丘与浅色天空的风景占位插画', description: '示例描述：层叠的山丘成为记忆的容器，远处的风景在色块之间慢慢浮现。' },
    { id: '3', title: '一枝，或一个下午', year: '2023', series: '日常的切片', medium: '布面油画', size: '60 × 80 cm', image: 'images/painting-01.jpg', alt: '米色瓶中一枝深色植物的占位插画', description: '示例描述：一枝植物与空白空间，构成对时间和轻微变化的观察。' },
    { id: '4', title: '光的边界', year: '2023', series: '空间练习', medium: '布面油画', size: '90 × 90 cm', image: 'images/window.svg', alt: '褐色室内与窗边斜射光线的占位插画', description: '示例描述：光落在空房间的墙面与地面上，划分出不同的温度与节奏。' },
    { id: '5', title: '岸边的风', year: '2024', series: '风景的记忆', medium: '布面油画', size: '100 × 70 cm', image: 'images/coast.svg', alt: '沙色海岸与灰绿色水面的占位插画', description: '示例描述：从记忆中的海岸出发，寻找色彩与距离之间的关系。' },
    { id: '6', title: '无声的房间', year: '2022', series: '空间练习', medium: '布面油画', size: '70 × 90 cm', image: 'images/room.svg', alt: '暖灰色房间里一把椅子的占位插画', description: '示例描述：空置的房间与一把椅子，让观看停留在物体之外的空间。' }
  ]
};
