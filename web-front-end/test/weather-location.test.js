const originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
const waitTime = 3000;

describe("Weather location inner workings", () => {

    beforeAll(function(done) {
        // For this test we want to see how the page loads in startup
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

        fixture.setBase("test");
        fixture.load("weather.fixture.html");
        window.WeatherLocationController.initMap();
        // wait for the api's to respond
        setTimeout(function(){
            done(); // start the testing!
        }, waitTime);
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        fixture.cleanup();
    });

    describe("Weather location initialization", () => {

        it("should have read google maps api correctly", () => {
            expect(window.google).toBeDefined();
            expect(window.map).toBeDefined();
        });

        it("should start with the beautiful country of GEEERMANY", () => {
            expect($("#title").html()).toBe("Germany");
        });

        it("should have some picture from the list", () => {
            expect($("#image").attr('src')).toMatch(/.svg/g);
        });

        it("should display a temperature", () => {
            expect($("#temperature").html()).toMatch(/\d+ F/g);
        });

        it("should display a summary of the weather", () => {
            expect($("#summary").html()).toMatch(/\w+/g);
        });

    });

    describe("Weather initialization at other location", () => {

        beforeAll(function(done) {
            let laPosition = { lat: 34.0522, lng: -118.2437 };
            window.WeatherLocationController.initVariables(laPosition);
            setTimeout(function(){
                done(); // start the testing!
            }, waitTime);
        });

        it("should have google maps api still loaded", () => {
            expect(window.google).toBeDefined();
            expect(window.map).toBeDefined();
        });

        it("should now load the counrty of Estados Unidos de Norte America!", () => {
            expect($("#title").html()).toBe("United States");
        });

        it("should have some picture from the list", () => {
            expect($("#image").attr('src')).toMatch(/.svg/g);
        });

        it("should display a temperature", () => {
            expect($("#temperature").html()).toMatch(/\d+ F/g);
        });

        it("should display a summary of the weather", () => {
            expect($("#summary").html()).toMatch(/\w+/g);
        });

    });


    describe("Search weather in uruguay", () => {
        beforeAll(function(done) {
            let urugPosition = { lat: -34, lng: -55 };
            window.WeatherLocationController.initVariables(urugPosition);
            setTimeout(function(){
                done(); // start the testing!
            }, waitTime);
        });

        it("should have google maps api still loaded", () => {
            expect(window.google).toBeDefined();
        });

        it("should now load Uruguay!", () => {
            expect($("#title").html()).toBe("Uruguay");
        });

        it("should have some picture from the list", () => {
            expect($("#image").attr('src')).toMatch(/.svg/g);
        });

        it("should display a temperature", () => {
            expect($("#temperature").html()).toMatch(/\d+ F/g);
        });

        it("should display a summary of the weather", () => {
            expect($("#summary").html()).toMatch(/\w+/g);
        });

    });

    describe("Try a bunch of locations ", () => {

        beforeAll(function(done) {
            window.WeatherLocationController.initVariables({lat: 0, lng: 0});
            setTimeout(function(){
                done(); // start the testing!
            }, waitTime);
        });

        it("should have google maps api still loaded", () => {
            window.WeatherLocationController.initVariables({lat: 49, lng: 2});
            setTimeout(function(){
                expect(window.google).toBeDefined();
                expect(window.map).toBeDefined();
                expect($("#title").html()).toBe("France");
                expect($("#image").attr('src')).toMatch(/.svg/g);
                expect($("#temperature").html()).toMatch(/\d+ F/g);
                expect($("#summary").html()).toMatch(/\w+/g);
            }, waitTime);

        });

        it("should now load Uruguay!", () => {
            window.WeatherLocationController.initVariables({lat: 50, lng: 14});
            setTimeout(function(){
                expect(window.google).toBeDefined();
                expect(window.map).toBeDefined();
                expect($("#title").html()).toBe("Czechia");
                expect($("#image").attr('src')).toMatch(/.svg/g);
                expect($("#temperature").html()).toMatch(/\d+ F/g);
                expect($("#summary").html()).toMatch(/\w+/g);
            }, waitTime);

        });

    });

    describe("API call to geonames", () => {
        var request;

        beforeEach(() => {
            jasmine.Ajax.install();
            window.WeatherLocationController.initVariables({lat: 50, lng: 14});
            request = jasmine.Ajax.requests.mostRecent();
        });

        afterEach(() => {
            jasmine.Ajax.uninstall();
        });

        it("search for the name of the country af that location", () => {
            expect(request.url).toBe('http://ws.geonames.org/countryCodeJSON?lat=50&lng=14&username=juanjo.neri');
        });

        it("respond with the correct object", () => {
            request.respondWith({
                status: 200,
                responseText: '{"languages":"cs,sk","distance":"0","countryCode":"CZ","countryName":"Juanjolandia"}'
            });
            setTimeout(function(){
                expect($("#title").html()).toBe("Juanjolandia");
            }, waitTime);
        });

    });

    describe("API call to dark sky", () => {
        var request;

        beforeEach(() => {
            jasmine.Ajax.install();
            window.WeatherLocationController.initVariables({lat: 50, lng: 14});
            request = jasmine.Ajax.requests.at(0);
        });

        afterEach(() => {
            jasmine.Ajax.uninstall();
        });

        it("search for the weather of the country af that location", () => {
            let proxi = 'https://cors-anywhere.herokuapp.com/';
            let url = 'https://api.darksky.net/forecast/b6f3e2c4cc625fea87d99c6f7f629434/50,14';
            expect(request.url).toBe(proxi + url);
        });

        it("respond with the correct object", () => {
            request.respondWith({
                status: 200,
                responseText: '{"hourly":{summary:"test_summary","icon":"test_icon"}},{"currentrly":{temperature:"0"}}}'
            });
            setTimeout(function(){
                expect($("#image").attr('src')).toBe('test_icon');
                expect($("#temperature").html()).toBe('0 F');
                expect($("#summary").html()).toBe('test_summary');
            }, waitTime);
        });

    });

    // IDEALLY HERE WE WOULD TEST FOR API CALL TO GOOGLE maps
    // THIS HOWERVER CANNOT BE ACHIEVED FROM JASMINE,
    // TEST COVERAGE IS THEREFORE STRONGLY AFFECTED

    // TEST:
    // trigger click on google map specific location
    // this would rund the code inside the `map.addListener('click', function(event) {...`
    // which is never touched in this test suite!
    // check api called the correct urls (3 of them for maps, weather, country)
    // check fields in html resond correctly to event
    // fake a response and check card gets updated accordingly

    describe("Card", () => {

        beforeEach(() => {
            window.WeatherLocationController.initVariables({lat: 50, lng: 14});
        });

        it("should have an image, a title a summary and a temperature", () => {
            expect($(".card").children().length).toBe(5);
        });

    });

});
