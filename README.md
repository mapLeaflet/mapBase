# 基础地图

### MapSource
地图源,包含有 高德地图 天地图


代码使用:
```
 var gaode = mapSource.gaode({maxZoom: 16, minZoom: 5}); //高德地图
```
-----
### BoundaryCanvas
区域地图, 使用html5的 Canvas把当前 geo数据的区域展示出来,其他区域隐	藏掉

代码使用:
``` 
BoundaryCanvas(gaode.imga, guizhouData)
```
-----
### geoGuizhou
贵州省 市级 区域数据, 不包含县级区域


## demo
    
* 说不清楚, 就是调用了一个 cmd的模块, 这个模块里有3个模块
[demo1](https://mapleaflet.github.io/mapBase/demo/index_cmd.html)     

    
* 使用cmd 调用了3个模块 
[demo2](https://mapleaflet.github.io/mapBase/demo/index_cmd_use.html)     
    

* 不使用cmd的 
[demo2](https://mapleaflet.github.io/mapBase/demo/index.html)     

