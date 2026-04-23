# General Validation

这个任务只要用来确认想法，确认想法是否合理，更具体点说是：
1. 哪些非常合理
2. 哪些非常不合理
3. 哪些需要优化
4. 哪些可以放弃
5. 如何实现这个想法，难点是什么，风险是什么
6. 每一个分析的结果，都需要记录在[text](../analsysis) 这个目录里面



## Task 1： 分析Intent Driven 方式
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
请分析以上的主要观点，给出分析建议。


## Task 2: 细化Task1

1. 如果要实现Task 1中描述的状态，是否可以先实现一个简单的版本，包括了sidebar，workspace，main page，process bar
2. 然后main page上面有一两个已经基本固定流程按钮，点击，然后main page上面展示每个步骤节点，然后用户可以在步骤节点下面进行操作，process bar可以记录这些
3. 步骤节点可以是左右两侧，左侧节点，右侧crud输入呢？

请探索这个可能行，并且因为workflow，所有有一个overview，每一步可以保存draft状态，ai然后再接入分析context，发现可以再自动执行什么？或者第一步就是先输入一个必须要要的信息，然后这个信息，开始创建workflow的节点，然后开始继续往下个做，请分析一下这种USE Case开发模式。写心得case study分析
我不太想加入底部常驻 Process Bar，process bar在右侧栏位比较好，可能信息还比较多，因为会记录推进阶段，和context信息，还有之后做什么事情的，因次这个是一个推进上下文，你看法如何，请根据这个评测修改之前的case study，或者添加内容