# Layout Components UI for better task writing

## Task 1: Create layout components ui for task writing

- 常见一个展示所有ui中component，layout等等所有组件的网页，用户可以在网页中查看所有组件的代码，
- 然后选择需要的页面布局生成可以让AI Agent更好里面的task的描述，可以组合复制这些任务的描述
- 比如选择了一个layout组件，就可以生成类似于一个task描述，生成什么样的布局，block使用使用什么这样的东西

请分析这个网站的可行性，架构，难点，似乎是在shacdn-ui这个基础上实现，因为目前的网站只是展示，但是没有添加生成AI task生成的描述，但是请你可行性分析，架构，技术难度，计划和任务拆解。技术细节需要说明的比较清楚明了，让不是前端开发的专家也可以理解难点问题或者使用的技术。

## Task 2: 请实现这个网站的功能

请按照[layout-feature](../../docs/features/layout-components-ui.md)中的描述，实现这个网站的功能,在app/layout-composer目录下实现，如果这个目录没有请重新创建.

## Task 3: 迁移shadcn-ui 到当前应用

1. https://ui.shadcn.com/ is a website for displaying all the components in shadcn-ui
2. folder [shadcn-ui](../../frontend-tpl/shadcn-ui) is the source code of shadcn-ui
3. please review this project to understand, and generate an AGENTs.md file 
4. What I want to change to my current layout-composer application is that
    1. the shadcn-ui's block page is the home page of this application
    2. the sider bar of this applicaiton is the different of sections:
        1. blocks
        2. components
        3. charts
    3. once click these seciton, the main page is two columns layout:
       1. the left side is sidebar like display all the blocks/components 
       2. once click one block or componet, the right side is the detail page of that block or componet
       3. in the right side, there is a button to copy the code of that block or componet and a button to copy the AI task description of that block or componet
    4. copy all the code of that block or componet into current project ui package,it should be well-structured

## Task 4: Component/Block Migration

1. 确保[shadcn-ui](../../frontend-tpl/shadcn-ui) 中所有的components and blocks 都被迁移，目前我看是没有的
尤其是block，并且要把这些Block，UI component 迁移到 packages/ui 中去，layout composer的组件可以在layout composer 中编写
2. Sidebar的实现UI非常不好，希望直接可以用gshadcn-ui中自己的实现完成，UI的间隔非常不好
3. Siderbar选择比如说Block之后，右侧Content也是two column 设计，默认第一个Block选中，然后右边展示会Block的内容的
4. Home Page 可以沿用目前形势，但是需要有Sidebar，同时Sidebar是可以折叠的

## Task 5: Refine the Layout Website
I just remove the apps/layout-composer project, let create a totally new project,based on:
1. [hadcn-dashboard-landing-template](../../frontend-tpl/shadcn-dashboard-landing-template) 
2. [shadcn-ui](../../frontend-tpl/shadcn-ui) and [website](../../frontend-tpl/shadcn-ui/apps)

Here is the task:
1. please find: https://shadcnstore.com/templates/dashboard/shadcn-dashboard-landing-template/dashboard for referenece,learn it and read it.
2. The Source code is in[hadcn-dashboard-landing-template](../../frontend-tpl/shadcn-dashboard-landing-template) nextjs version
3. Please Read this page and this repo to change 
4. The Sidebar is same as the dashboard landing template,and all the component is same as this page
5. and put all the component in [text](../../packages/ui) package
6. and also include theme settings
7. The dashboard project with three categories:
    - Dashboard 
    - Apps
    - Pages
    I wan to add Component category in the sidebar
8. And in every Page, has a AI task description in Dashboard/Apps/Pages Category
9. in Component Category,every Component have a AI Task Description.

Let's first implement these, the main focus on this application is:
1. for user to easy to copy and generate UI code, use can see the layout, maybe application/dashboard/pages/Components, then copy the AI description to make it in AI Agent Chat 
2. And also to collect UI blocks,components for further usage