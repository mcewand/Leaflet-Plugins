// Space out points layered on top of each other
      var breakPoint = [6, 12, 24, 48];
      for (var idx in set){
        if (set[idx].length > 1) {
          var b = 0; // Reset break point
          var newAngle = 0; // Reset initial angle
          var radius = 20; // Reset circle radius

          for (var sub in set[idx]) {
            if (!isNaN(sub)) {

              // Expand concentric circles
              if (newAngle >= 2 * Math.PI ) {
                newAngle = 0;
                radius = radius + 30;
                b++;
              }

              // Get x,y coordinates
              var pos = '';
              if ($.browser.msie === true) {  // IE breaks if the check isn't run first
                if ($.browser.version > 9) {
                  pos = $(set[idx][sub]).css('transform').match(/(-?[0-9\.]+)/g);
                } else {
                  // Make a fake array to replicate what we'll expect later
                  var left = $(set[idx][sub]).css('left');
                  var top = $(set[idx][sub]).css('top');
                  pos = [1,1,1,1, left.substring(0, left.length - 2), top.substring(0, top.length - 2)];
                }
              } else {
                pos = $(set[idx][sub]).css('-webkit-transform').match(/(-?[0-9\.]+)/g);
                // Fix for FF
                if (!pos) {
                  pos = $(set[idx][sub]).css('-moz-transform').match(/(-?[0-9\.]+)/g);
                }
              }

              newX = Math.round(parseInt(pos[4]) + radius * Math.cos(newAngle));
              newY = Math.round(parseInt(pos[5]) + radius * Math.sin(newAngle));

              if ($.browser.msie === true) {
                if ($.browser.version < 10) {
                  $(set[idx][sub]).css({'left': newX + 'px', 'top':  newY + 'px'});
                } else {
                  $(set[idx][sub]).css('transform', 'translate('+ newX + 'px, ' + newY + 'px)' );
                }
              }

              $(set[idx][sub]).css('-webkit-transform', 'translate3d(' + newX + 'px, ' + newY + 'px, 0px)' );
              $(set[idx][sub]).css('-moz-transform', 'translate3d(' + newX + 'px, ' + newY + 'px, 0px)' );
              newAngle = newAngle + (2 * Math.PI) / breakPoint[b];
            }
          }
        }
