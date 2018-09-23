

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against this application.
 */

/* All my tests will be placed under the $() function,
 * since some of these tests may require DOM elements. The tests will be run until 
 * the DOM is ready.
 */
$(function() {
    /* This is the first test suite that it came in by default when I downloaded
    * the repository from Github. It is a test suite that contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in my application.
    */
    describe('RSS Feeds', function() {
        /* This is the first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. This is the fisrt new spec that came in with the project. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is test that loops through each feed
         * in the allFeeds object and makes sure it has a URL defined
         * and that the URL is not empty.
         */
        it(`URL is defined and not empty`, function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and makes sure it has a name defined
         * and that the name is not empty.
         */
            it('named and not to be empty', function () {
            for(var i=0, len=allFeeds.length; i<len; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
     });


    /* This is a new test suite named "The menu" */
        describe(`The menu`, function(){
        /* Then I am writing a test to hide the menu element
         * by default. The recommendation is to analyze the HTML and
         * the CSS to come with a good
         * hiding/showing of the menu element.
         */
                it('element is hidden', function() {
            var checkClass = $('body').hasClass('menu-hidden');
            expect(checkClass).toBe(true);
        });
    
    
    
         /* This is a test to make sure that the menu changes
          * visibility when the menu icon is clicked. This test
          * does the menu display when
          * clicked and it hides when clicked again.
          */
                it('toggles visibility when menu icon is clicked', function() {
                    $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);  
            
        });
    });
    
    
    /* This is a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        
        /* This is a test for  when the loadFeed
         * function is called and completes its work,
         * A tip to remember loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
            beforeEach(function(done) {
            loadFeed(0, done);
        });

            it('are present when LoadFeed is called', function() {
            var checkForEntry = $('.feed .entry').length;
            expect(checkForEntry).toBeGreaterThan(0);
        });

    });

        
    /* This is a new test suite called "New Feed Selection" */
        describe('New Feed Selection', function() {
        var oldFeed;

        /* This is a test that works when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Also below is a new spec named "changes its loaded content".
         */
               var initFeedSelection;
    beforeEach(function(done) {
      loadFeed(0, function() {
        initFeedSelection = document.querySelector(".feed").innerHTML;

        loadFeed(1, function() {
          done();
        });
      });
  });
            
                it("changes its loaded content", function(done) {
      var newFeedSelection = document.querySelector(".feed").innerHTML;
      expect(initFeedSelection).not.toBe(newFeedSelection);
      done();
    });
  });
});


