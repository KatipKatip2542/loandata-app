const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
            //   '@primary-color': '#1890ff', 
              '@primary-color': #34fff5, // เปลี่ยนสีหลัก
              '@menu-item-selected-bg': '#754e11', // เปลี่ยนสีพื้นหลังเมื่อเลือกเมนู
              // เพิ่มตัวแปร modifyVars ตามต้องการ
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
