document.addEventListener('DOMContentLoaded', function () {
  // 菜品列表
  const dishes = [
    '火锅', '烤肉', '麻辣烫', '炒饭', '面条',
    '寿司', '汉堡', '披萨', '沙拉', '炸鸡',
    '水饺', '包子', '粥', '牛排', '烧烤',
    '冒菜', '盖浇饭', '煲仔饭', '米线', '饺子'
  ];

  const wheel = document.getElementById('wheel');
  const spinButton = document.getElementById('spin-button');
  const resultElement = document.getElementById('result');
  let isSpinning = false;

  // 创建转盘
  function createWheel() {
    const itemCount = dishes.length;
    const anglePerItem = 360 / itemCount;
    const colors = [
      '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2',
      '#073B4C', '#EF476F', '#FFC43D', '#1B9AAA', '#6D597A'
    ];

    // 清空转盘
    wheel.innerHTML = '';

    const radius = Math.min(wheel.clientWidth, wheel.clientHeight) / 2;
    const labelRadius = radius - 32; // 让文字靠近外圈

    for (let i = 0; i < itemCount; i++) {
      // 扇形区域（背景色）
      const slice = document.createElement('div');
      slice.className = 'wheel-item';
      slice.style.transform = `rotate(${i * anglePerItem}deg)`;
      slice.style.backgroundColor = colors[i % colors.length];
      wheel.appendChild(slice);

      // 文本标签（不被扇形裁剪）
      const label = document.createElement('div');
      label.className = 'wheel-label';
      label.textContent = dishes[i];

      const centerAngle = i * anglePerItem + anglePerItem / 2; // 扇形中心角度
      // 以圆心为基准，旋转到该角度后向上（负Y）移动指定半径，再反向旋转使文字水平
      label.style.transform = `translate(-50%, -50%) rotate(${centerAngle}deg) translate(0, -${labelRadius}px) rotate(${-centerAngle}deg)`;
      wheel.appendChild(label);
    }
  }

  // 旋转转盘
  function spinWheel() {
    if (isSpinning) return;

    isSpinning = true;
    spinButton.disabled = true;
    resultElement.textContent = '';
    resultElement.classList.remove('fade-in');

    // 随机旋转角度 (5-10圈 + 随机角度)
    const itemCount = dishes.length;
    const anglePerItem = 360 / itemCount;
    const spinCount = 5 + Math.floor(Math.random() * 5);
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalDegrees = spinCount * 360 + extraDegrees;

    // 设置旋转动画
    wheel.style.transform = `rotate(${totalDegrees}deg)`;

    // 计算结果
    setTimeout(() => {
      const normalizedDegree = (360 - (totalDegrees % 360)) % 360; // 指针在上方
      const itemIndex = Math.floor(normalizedDegree / anglePerItem) % itemCount;

      const selectedDish = dishes[itemIndex];

      setTimeout(() => {
        resultElement.textContent = `今天吃：${selectedDish}！`;
        resultElement.classList.add('fade-in');
        isSpinning = false;
        spinButton.disabled = false;
      }, 300);
    }, 4000); // 与CSS过渡时间一致
  }

  // 初始化
  createWheel();
  // 点击抽取
  spinButton.addEventListener('click', spinWheel);
});