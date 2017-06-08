(function (window, factory) {
    if (typeof exports === 'object') {
        console.log('CommonJS')
        module.exports = factory(require('leaflet'));


    } else if (typeof define === 'function') {
        console.log('amd or cmd')

        //amd调用这个
        define(['leaflet'], factory);

        //cmd 调用这个
        define(function (require, exports, module) {

            module.exports=factory(window.L)
        });

    } else {
        console.log('原生')

        window.mapSource = factory(window.L)

    }
})(this, function (L) {
    //module ...
    // var L=window.L;

    L.TileLayer.ChinaProvider = L.TileLayer.extend({

        initialize: function (type, options) { // (type, Object)
            var providers = L.TileLayer.ChinaProvider.providers;

            var parts = type.split('.');

            var providerName = parts[0];
            var mapName = parts[1];
            var mapType = parts[2];

            var url = providers[providerName][mapName][mapType];
            options.subdomains = providers[providerName].Subdomains;

            L.TileLayer.prototype.initialize.call(this, url, options);
        }
    });

    L.TileLayer.ChinaProvider.providers = {
        TianDiTu: {
            Normal: {
                Map: "http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}",
                Annotion: "http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}",
            },
            Satellite: {
                Map: "http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}",
                Annotion: "http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}",
            },
            Terrain: {
                Map: "http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}",
                Annotion: "http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}",
            },
            Subdomains: ['0', '1', '2', '3', '4', '5', '6', '7']
        },

        GaoDe: {
            Normal: {
                Map: 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
            },
            Satellite: {
                Map: 'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
                Annotion: 'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
            },
            Subdomains: ["1", "2", "3", "4"]
        },


        Google: {
            Normal: {
                Map: "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            },
            Satellite: {
                Map: "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
            },
            Subdomains: []
        },

        Geoq: {
            Normal: {
                Map: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
                Color: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer/tile/{z}/{y}/{x}",
                PurplishBlue: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
                Gray: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
                Warm: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer/tile/{z}/{y}/{x}",
                Cold: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetCold/MapServer/tile/{z}/{y}/{x}"
            },
            Subdomains: []

        }
    };

    L.tileLayer.chinaProvider = function (type, options) {
        return new L.TileLayer.ChinaProvider(type, options);
    };


    //地图默认配置 zoom 地图最小缩放级别
    //{maxZoom: '最大缩放级别', minZoom: '最小缩放级别'}
    var MapSource = function () {

        console.info("MapSource ok")

    };


    //天地图
    MapSource.prototype.tianditu = function (zoom) {

        return {

            //平面地图 道路地名
            normala: L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', zoom),

            //平面地图 地区名称
            normalm: L.tileLayer.chinaProvider('TianDiTu.Normal.Map', zoom),

            //卫星地图
            imgm: L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', zoom),

            //卫星地图 道路地名
            imga: L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', zoom)


        };


    };


    //高德地图
    MapSource.prototype.gaode = function (zoom) {
        return {
            //平面地图 地区名称 道路地名
            normalm: L.tileLayer.chinaProvider('GaoDe.Normal.Map', zoom),

            //卫星地图
            imgm: L.tileLayer.chinaProvider('GaoDe.Satellite.Map', zoom),

            //卫星地图 道路地名
            imga: L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', zoom)
        };
    };


    return new MapSource

});