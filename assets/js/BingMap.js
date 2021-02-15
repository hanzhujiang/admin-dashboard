export default {
  bingUserKey: 'Auo7-fEnp8EOjGFag5FfgCc1yicQTVTAcu06EN4_z-r1u3vxVKJbhty97i24snz-',
  init: function (){
    // bing map key
    const BingMap_URL = 'https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=' + this.bingUserKey;
    return new Promise((resolve, reject) => {
      window.GetMap = function() {
        resolve(Microsoft.Maps);
      };

      // 插入script脚本
      let scriptNode = document.createElement("script");
      scriptNode.setAttribute("type", "text/javascript");
      scriptNode.setAttribute("src", BingMap_URL);
      scriptNode.async = true;
      scriptNode.onerror = reject;
      document.body.appendChild(scriptNode);

    });
  },
  // 清空地图上的图钉
  cleanMap: function(map) {
    map.entities.clear();
  },
  // 生成地图对象
  createMap: function(id, posit) {
    var map;
    if (posit == null) {
      map = new Microsoft.Maps.Map(id, {
              credentials: this.bingUserKey,
              supportedMapTypes: [Microsoft.Maps.MapTypeId.road, Microsoft.Maps.MapTypeId.aerial],
              disableStreetside: true
            });
    } else {
      map = new Microsoft.Maps.Map(id, {
              credentials: this.bingUserKey,
              center: new Microsoft.Maps.Location(posit.latitude, posit.longitude),
              supportedMapTypes: [Microsoft.Maps.MapTypeId.road, Microsoft.Maps.MapTypeId.aerial],
              disableStreetside: true
            });
    }
    return map;
  },
  // 设置图钉
  setPushPin: function (map, posits, proc) {
    this.cleanMap(map); 
    posits.forEach(function(posit){
      if (posit.category !== undefined) {
        let icon_url = '';
        if (posit.category === '01') {
          icon_url = 'https://arc-ricp-data.oss-cn-hongkong.aliyuncs.com/map/apart_pin.png'; 
        } else if (posit.category === '02') {
          icon_url = 'https://arc-ricp-data.oss-cn-hongkong.aliyuncs.com/map/house_pin.png'; 
        } else if (posit.category === '03') {
          icon_url = 'https://arc-ricp-data.oss-cn-hongkong.aliyuncs.com/map/commercial_pin.png'; 
        } else if (posit.category === '99') {
          icon_url = 'https://arc-ricp-data.oss-cn-hongkong.aliyuncs.com/map/display_pin.png'; 
        }
        var pushpin = new Microsoft.Maps.Pushpin(
          new Microsoft.Maps.Location(posit.latitude, posit.longitude), {
              icon: icon_url,
              anchor: new Microsoft.Maps.Point(8, 12)
            }); 
      } else {
        var pushpin = new Microsoft.Maps.Pushpin(
          new Microsoft.Maps.Location(posit.latitude, posit.longitude), null); 
      }  
      map.entities.push(pushpin);
      Microsoft.Maps.Events.addHandler(pushpin, 'click', 
          function (args) { 
            proc(posit.code,args.point.x,args.point.y,posit.latitude,posit.longitude); 
          });
    });
  },
  onClick: function(map, func) {
    Microsoft.Maps.Events.addHandler(map, 'click', func);
  },
  getClickLocation: function(e) {
    var point = new Microsoft.Maps.Point(e.pageX, e.pageY);
    return e.target.tryPixelToLocation(point, Microsoft.Maps.PixelReference.page);
  },
  getLocation: function(latitude, longitude) {
    return new Microsoft.Maps.Location(latitude, longitude);
  },
  showLocation: function(map, posits, proc) {
    this.setPushPin(map, posits, proc);
    if (posits.length == 1) {
      map.setView({
        center: this.getLocation(posits[0].latitude, posits[0].longitude),
        zoom: 16
      });
    } else {
      let locations = [];
      posits.forEach(element => {
        locations.push(this.getLocation(element.latitude, element.longitude));
      });
      map.setView({
        bounds: Microsoft.Maps.LocationRect.fromLocations(locations),
        padding: 50
      });
    }
  },

  searchMultiAddress: function (map, address, proc) {
    this.cleanMap(map);
    var locations = [];
    address.forEach(element => {
      Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
        var searchManager = new Microsoft.Maps.Search.SearchManager(map);
        var requestOptions = {
            bounds: map.getBounds(),
            where: element.text,
            userData: element,
            callback: function (answer, userData) {
              let icon_url = '';
              if (userData.category === '01') {
                icon_url = 'https://arc-ricp-data.oss-cn-hongkong.aliyuncs.com/map/apart_pin.png'; 
              } else if (userData.category === '02') {
                icon_url = 'https://arc-ricp-data.oss-cn-hongkong.aliyuncs.com/map/house_pin.png'; 
              } else if (userData.category === '03') {
                icon_url = 'https://arc-ricp-data.oss-cn-hongkong.aliyuncs.com/map/commercial_pin.png'; 
              } else if (userData.category === '99') {
                icon_url = 'https://arc-ricp-data.oss-cn-hongkong.aliyuncs.com/map/display_pin.png'; 
              }
              let location = answer.results[0].location;
              var pushpin = new Microsoft.Maps.Pushpin(location,
                      {
                        icon: icon_url,
                        anchor: new Microsoft.Maps.Point(8, 12)
                      });
              map.entities.push(pushpin);
              Microsoft.Maps.Events.addHandler(pushpin, 'click', 
                      function (args) { 
                        proc(userData.code,args.point.x,args.point.y,
                            location.latitude,location.longitude); 
                      });
              locations.push(location);
              map.setView({
                bounds: Microsoft.Maps.LocationRect.fromLocations(locations),
                padding: 50
              });
            }
        };
        searchManager.geocode(requestOptions);
      })
    });
  },
  searchAddress: function (map, address, proc) {
    this.cleanMap(map);
    Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
      var searchManager = new Microsoft.Maps.Search.SearchManager(map);
      var requestOptions = {
          bounds: map.getBounds(),
          where: address.text,
          userData: address,
          callback: function (answer, userData) {
              map.setView({ bounds: answer.results[0].bestView, padding: 150 });
              let icon_url = '';
              if (userData.category === '01') {
                icon_url = 'https://arc-ricp-data.oss-cn-hongkong.aliyuncs.com/map/apart_pin.png'; 
              } else if (userData.category === '02') {
                icon_url = 'https://arc-ricp-data.oss-cn-hongkong.aliyuncs.com/map/house_pin.png'; 
              } else if (userData.category === '03') {
                icon_url = 'https://arc-ricp-data.oss-cn-hongkong.aliyuncs.com/map/commercial_pin.png'; 
              } else if (userData.category === '99') {
                icon_url = 'https://arc-ricp-data.oss-cn-hongkong.aliyuncs.com/map/display_pin.png'; 
              }
              let location = answer.results[0].location;
              var pushpin = new Microsoft.Maps.Pushpin(location,
                              {
                                icon: icon_url,
                                anchor: new Microsoft.Maps.Point(8, 12)
                              })
              map.entities.push(pushpin);
              Microsoft.Maps.Events.addHandler(pushpin, 'click', 
                              function (args) {
                                proc(userData.code,args.point.x,args.point.y,
                                  location.latitude,location.longitude); 
                                });
              proc(userData.code,'','', location.latitude,location.longitude); 
           }
      };
      searchManager.geocode(requestOptions);
    })
  }
}  