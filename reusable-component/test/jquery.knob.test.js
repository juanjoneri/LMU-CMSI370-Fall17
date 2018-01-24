describe("Knob jQuery plugin", () => {
    const options = {
        change: () => {
            // No-op; Jasmine spy will check on whether this got called.
        }
    };

    beforeEach(() => {
        fixture.setBase("test");
        fixture.load("jquery.knob.fixture.html");
    });

    afterEach(() => fixture.cleanup());

    it("should return itself when the plugin is installed", () => {
        const $target = $(".knob-test");
        const $pluginResult = $target.knob(options);

        expect($pluginResult).toBe($target);
    });

    let transformUpdateTest = () => {
        // When synthesizing events, we need only explicitly set the values that the plugin code will
        // actually use.
        const mousedown = $.Event("mousedown", { pageX: 68, pageY: 67 });
        $(".knob-test").trigger(mousedown);

        let mousemove = $.Event("mousemove", { pageX: 69, pageY: 68 });
        $(".knob-test").trigger(mousemove);

        // We check against the style attribute because the CSS property will be the generalized "converted"
        // value of the transform, which is too unwieldy to express manually.
        expect($(".knob-test").attr('style'))
            .toBe("width: 120px; height: 120px; transform: perspective(500px) rotateZ(90deg);");

        mousemove = $.Event("mousemove", { pageX: 68, pageY: 67 });
        $(".knob-test").trigger(mousemove);
        expect($(".knob-test").attr('style'))
            .toBe("width: 120px; height: 120px; transform: perspective(500px) rotateZ(0deg);");

        $(".knob-test").trigger($.Event("mouseup"));
    };

    let knobAngleUpdateTest = () => {
        const mousedown = $.Event("mousedown", { pageX: 68, pageY: 67 });
        $(".knob-test").trigger(mousedown);

        let mousemove = $.Event("mousemove", { pageX: 619, pageY: 69 });
        $(".knob-test").trigger(mousemove);
        expect($(".knob-test").data('knob-angle')).toBeGreaterThan(0);

        mousemove = $.Event("mousemove", { pageX: 619, pageY: 68 });
        $(".knob-test").trigger(mousemove);
        expect($(".knob-test").data('knob-angle')).toBeCloseTo(90, 1);

        $(".knob-test").trigger($.Event("mouseup"));
    };

    describe("installed behavior with callback", () => {
        beforeEach(() => $(".knob-test").knob(options));

        it("should update its CSS transform correctly", transformUpdateTest);
        it("should update the knob angle correctly", knobAngleUpdateTest);

        it("should invoke the callback correctly", () => {
            spyOn(options, 'change');

            const mousedown = $.Event("mousedown", { pageX: 69, pageY: 68 });
            $(".knob-test").trigger(mousedown);

            let mousemove = $.Event("mousemove", { pageX: 619, pageY: 67 });
            $(".knob-test").trigger(mousemove);
            expect(options.change).toHaveBeenCalledWith(0, 89.89601503338237);

            mousemove = $.Event("mousemove", { pageX: 619, pageY: 68 });
            $(".knob-test").trigger(mousemove);
            expect(options.change).toHaveBeenCalledWith(89.89601503338237, 90);

            $(".knob-test").trigger($.Event("mouseup"));
        });
    });

    describe("installed behavior without callback", () => {
        beforeEach(() => $(".knob-test").knob());

        it("should update its CSS transform correctly", transformUpdateTest);
        it("should update the knob angle correctly", knobAngleUpdateTest);
    });
});
