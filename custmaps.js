    // New Map
    function newMap(wmts_urls, layers_name, epsg, resmin, resmax, resview, center, target, swipe=false, legend="", osmsrc=new ol.source.OSM()){

      // Projections and scales
      var projection = new ol.proj.get('EPSG:'+epsg);
      var projectionExtent = projection.getExtent();
      var size = ol.extent.getWidth(projectionExtent) / 256;
      var nRes = resmax
      var resolutions = new Array(nRes);
      var matrixIds = new Array(nRes);
      for (var z = 0; z < nRes; ++z) {
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
      }

      // Map
      layers = [new ol.layer.Tile({source: osmsrc})];
      for (var i = 0; i < wmts_urls.length; i++) {
        newLayer = new ol.layer.Tile({
          title: layers_name[i],
          source: new ol.source.WMTS({
                attributions: 'Remi CRESSON (UMR TETIS/INRAE)' + legend,
                url: wmts_urls[i],
                layer: layers_name[i],
                baseLayer: true,
                matrixSet: 'EPSG:3857',
                format: 'image/png',
                projection: projection,
                tileGrid: new ol.tilegrid.WMTS({
                  origin: ol.extent.getTopLeft(projectionExtent),
                  resolutions: resolutions,
                  matrixIds: matrixIds
                }),
                style: 'default',
                wrapX: true
          })
        });

        layers.push(newLayer);
      }

      var map = new ol.Map({
              target: target,
              view: new ol.View({
                zoom: resview,
                center: center,
                minZoom: resmin,
                maxZoom: nRes
              }),
              controls: ol.control.defaults().extend([new ol.control.LayerPopup(), new ol.control.FullScreen()]),
              layers: layers
            });
//      var zoomslider = new ol.control.ZoomSlider();
//      map.addControl(zoomslider);
      if (swipe){
        var ctrl = new ol.control.Swipe();
        map.addControl(ctrl);
        for (var i = 1; i < 3; i++) {
          ctrl.addLayer(layers[i], i != 1);
        }
      }

      return map;

    }

    // Map1
    var urls1 = ['https://mdl4eo-cartes.irstea.fr/index.php/lizmap/service/?repository=supresol&project=super_resolution_v2',
                 'https://mdl4eo-cartes.irstea.fr/index.php/lizmap/service/?repository=supresol&project=super_resolution_v2',
                 'https://mdl4eo-cartes.irstea.fr/index.php/lizmap/service/?repository=supresol&project=super_resolution_v2'];
    var layers1 = ['Original S2 image ', 'High-res S2 image', 'Training patches footprint'];
    var map1 = newMap(urls1, layers1, 3857, 10, 18, 16, [453333, 5484830], 'map1', true, ", CESBIO, CNES")

    // Map2
    var urls2 = ['https://mdl4eo-cartes.irstea.fr/index.php/lizmap/service/?repository=artisols&project=prototype'];
    var layers2 = ['mosa_map_full'];
    var map2 = newMap(urls2, layers2, 3857, 7, 17, 6, [276396.294279, 6443539], 'map2')

    // Map2 legend
    var mainbar = new ol.control.Bar();
    map2.addControl(mainbar);
    mainbar.setPosition("top-left");
    var selectCtrl = new ol.control.Toggle({html: '<img src="https://mdl4eo-cartes.irstea.fr/index.php/lizmap/service/?repository=artisols&project=prototype&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=mosa_map_full&STYLE=default&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&FORMAT=image%2Fpng&TRANSPARENT=TRUE&WIDTH=150&LAYERFONTSIZE=0&ITEMFONTSIZE=9&SYMBOLSPACE=1&ICONLABELSPACE=2&DPI=96&LAYERSPACE=0&LAYERFONTBOLD=FALSE&LAYERTITLE=FALSE&SCALE=2311162.216833398" style="background-color:white";>' });
    mainbar.addControl(selectCtrl);

    // Map3
    var urls3 = ['https://mdl4eo-cartes.irstea.fr/index.php/lizmap/service/?repository=tosca20&project=prototype'];
    var layers3 = ['mosa_map_full', 'mosa_map_full_2018', 'mosa_map_full_2017', 'mosa_map_full_2016'];
    var map3 = newMap(urls3, layers3, 3857, 7, 17, 7, [276396.294279, 5443539], 'map3', false, "", new ol.source.Stamen({layer: 'toner'}))

    // Map3 legend
    var mainbar3 = new ol.control.Bar();
    map3.addControl(mainbar3);
    mainbar3.setPosition("top-left");
    var selectCtrl3 = new ol.control.Toggle({html: '<img src="https://mdl4eo-cartes.irstea.fr/index.php/lizmap/service/?repository=tosca20&project=prototype&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=mosa_map_full&STYLE=default&EXCEPTIONS=application%2Fvnd.ogc.se_inimage&FORMAT=image%2Fpng&TRANSPARENT=TRUE&WIDTH=150&LAYERFONTSIZE=0&ITEMFONTSIZE=9&SYMBOLSPACE=1&ICONLABELSPACE=2&DPI=96&LAYERSPACE=0&LAYERFONTBOLD=FALSE&LAYERTITLE=FALSE&SCALE=36111.90963802185" style="background-color:white";>' });
    mainbar3.addControl(selectCtrl3);
