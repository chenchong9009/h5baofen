  (function (win) {
    var remCalc = {};
    var docEl = win.document.documentElement,
      tid,
      hasRem = true,
      hasZoom = true,
      zoomRuler = 'width',
      designWidth = 750,
      designHeight = 1206;

    function refresh() {
      var width = docEl.clientWidth;
      var height = docEl.clientHeight;
      if (width > 768) width = 768;
      if (hasRem) {
        var rem = width / 10;
        docEl.style.fontSize = rem + "px";
        remCalc.rem = rem;
        var actualSize = parseFloat(window.getComputedStyle(document.documentElement)["font-size"]);
        if (actualSize !== rem && actualSize > 0 && Math.abs(actualSize - rem) > 1) {
          var remScaled = rem * rem / actualSize;
          docEl.style.fontSize = remScaled + "px";
        }
      }
      if (hasZoom) {
        var style = document.getElementById('J__style');
        if (!style) {
          style = document.createElement('style');
          style.id = 'J__style';
        }
        var r,s;
        if (zoomRuler === 'height') {
          r = height / designHeight;
        } else {
          r = width / designWidth;
        }
        r.toFixed && (r = r.toFixed(5));
        s = '.__z{zoom:' + r + '} ';
        s += '.__s{-webkit-transform: scale(' + r + ');transform: scale(' + r + ')}';

        style.innerHTML = s;
        document.getElementsByTagName('head')[0].appendChild(style);
      }
    }

    function dbcRefresh() {
      clearTimeout(tid);
      tid = setTimeout(refresh, 100)
    }
    win.addEventListener("resize", function () {
      dbcRefresh()
    }, false);

    win.addEventListener("pageshow", function (e) {
      if (e.persisted) {
        dbcRefresh();
      }
    }, false);
    refresh();
    if (hasRem) {
      remCalc.refresh = refresh;
      remCalc.rem2px = function (d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === "string" && d.match(/rem$/)) {
          val += "px";
        }
        return val;
      };
      remCalc.px2rem = function (d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === "string" && d.match(/px$/)) {
          val += "rem";
        }
        return val;
      };
      win.remCalc = remCalc;
    }
  })(window);