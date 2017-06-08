define(function (require, exports, module) {


        var mapSource=require('../build/MapSource.js');
        var BoundaryCanvas=require('../build/BoundaryCanvas.js');
        var guizhouData=require('../build/guizhousheng.js');



        var gaode = mapSource.gaode({maxZoom: 16, minZoom: 5}); //高德地图

        //高德地图
        var gaodeNormalm = L.layerGroup([gaode.normalm]); // 平面地图, 有边界道路- 有地区名称
        var gaodeImage = L.layerGroup([gaode.imgm, gaode.imga]); // 卫星地图, 有边界道路- 有地区名称
        var geoBoundary = L.layerGroup([BoundaryCanvas(gaode.imga, guizhouData)]);//新建一个区域边界


        var _baseLayers = {

            "地图": gaodeNormalm,
            "地球": gaodeImage,
            "区域": geoBoundary,

        };

        var _overlayLayers = {
            "边界": L.geoJson(guizhouData)
        };

        var maps = L.map('map', {
            center: [26.629907, 106.70278],
            zoom: 8,
            layers: gaodeNormalm,  //设置默认图层
        });

        //添加地图切换工具
        L.control.layers(_baseLayers, _overlayLayers, {collapsed: false}).addTo(maps);


        module.exports=maps


});