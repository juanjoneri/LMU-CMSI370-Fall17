/*
  A sample jQuery plug-in: this one converts the selected elements into a 3D
  “knob” control.

  This plugin's options object can include:

    change: function () { }
    - Callback for whenever the control has been manipulated.
*/
(($) => {
    $.fn.knob = function (options) {
        const $this = this;

        let $current = null;

        let centerX = 0;
        let centerY = 0;
        let center = {};
        let top = {};

        let findAngle = function(A, B, C) {
            let AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
            let BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
            let AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
            return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * 180 / Math.PI;
        };


        $this.addClass("knob").mousedown(function () {
            $current = $(this);

            let offset = $current.offset();
            let width = $current.width();
            let height = $current.height();

            centerX = offset.left + width / 2;
            centerY = offset.top + height / 2;
            center = {
                x: centerX,
                y: centerY
            };

            // We need three points for an angle
            top = {
                x: centerX,
                y: centerY - 1
            };
        });

        // Other mouse events go at the level of the document because
        // they might leave the element's bounding box.
        $(document).mousemove(event => {
            if ($current) {
                const currentAngle = $current.data('knob-angle') || 0;

                let mouse = {
                    x: event.pageX,
                    y: event.pageY
                };

                let newAngle = mouse.x > center.x ? findAngle(top, center, mouse) : -findAngle(top, center, mouse);

                const newCss = `perspective(500px) rotateZ(${newAngle}deg)`;

                $current.css({
                    'transform': newCss
                }).data({
                    'knob-angle': newAngle
                });

                // Invoke the callback. We want jQuery-like behavior that binds `this` to the component
                // that change, so we use `call` instead of plain parentheses.
                if ($.isPlainObject(options) && $.isFunction(options.change)) {
                    options.change.call($current, currentAngle, newAngle);
                }
            }
        }).mouseup(() => {
            $current = null;
        });

        return $this;
    };
})(jQuery);
