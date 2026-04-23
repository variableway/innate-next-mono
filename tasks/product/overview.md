# Overview

这是一个进行尝试的项目，主要目的是尝试进行只用Intent Driven 产品开发流程。
以下是当前主要想法：
1. 产品开发流程需要首先从一个完整的Use Case出发，那么开发或者产品的模式应该是：
   1. 选择一个Use Case一个具体的场景
   2. 然后根据这个场景，按照固定的流程生成一个步骤
   3. 每一个步骤不强制必须要完成，可以同时做，体现在页面就是一个
      A. Main Content Page, 主线内容，主要表示总体的步骤，当前的操作步骤，可以进行页面操作
      B. Process Bar: 这个可以是抽屉形状，主要是表达当前步骤的位置和进度
      C. Command Box: 这个是输入框，主要是输入当前的操作指令，这个可以使用自己定义的skill set，也可以使用别人的skill set，完全就是按照自己的需求来定义。同时输入指令之后，会根据指令来执行对应的操作。skill可以是具体的业务逻辑的API调用都可以，也可以是其他的操作，比如打开一个页面，点击一个按钮，输入一个值等。
      D. 不管是指令的操作还是在main content上的操作，都可以进行CRUD操作，同时反应在process bar上面
2. 在开发产品的过程中遵照：
    1. 先分析Use Case的流程，形成流程图
    2. 根据流程图，设计技术Domain概念和主要的UI CRUD page
    3. 主要的UI CRUD page 主要给CRUD操作，作为一个SUBMENU在SIDEBARD上面，不影响主流程的进行，主要流程可以随时调用这种页面进行页面操作
    4. DOMAIN分割之后，需要形成domain的Spec文件
    5. 最终形成的文件是：
      A. Use Case的说明，流程图，主要的Domain概念，主要的UI CRUD page说明
      B. Domain的Spec文件
      C. UI的Spec文件


