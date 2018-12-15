define('lib/text-balancer',[],function(){

    

    var candidates = [];

    // pass in a string of selectors to be balanced.
    // if you didnt specify any, thats ok! We'll just
    // balance anything with the balance-text class
    var textBalancer = function (selectors) {

        if (!selectors) {
            candidates = document.querySelectorAll('.balance-text');
        } else {
            createSelectors(selectors);
        }

        balanceText();

        var rebalanceText = debounce(function() {
            balanceText();
        }, 100);

        window.addEventListener('resize', rebalanceText);
    }

    // this populates our candidates array with dom objects
    // that need to be balanced
    var createSelectors = function(selectors) {
        selectorArray = selectors.split(',');
        for (var i = 0; i < selectorArray.length; i += 1) {
            var currentSelectorElements = document.querySelectorAll(selectorArray[i].trim());

            for (var j = 0; j < currentSelectorElements.length; j += 1) {
                var currentSelectorElement = currentSelectorElements[j];
                candidates.push(currentSelectorElement);
            }
        }
    }

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    var debounce = function (func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };


    // HELPER FUNCTION -- initializes recursive binary search
    var balanceText = function () {
        var element;
        var i;

        for (i = 0; i < candidates.length; i += 1) {
            element = candidates[i];

            if (textElementIsMultipleLines(element)) {
                element.style.maxWidth = '';
                squeezeContainer(element, element.clientHeight, 0, element.clientWidth);
            }

        }

    }

    // Make the element as narrow as possible while maintaining its current height (number of lines). Binary search.
    var squeezeContainer = function (element, originalHeight, bottomRange, topRange) {
        var mid;
        if (bottomRange >= topRange) {
            element.style.maxWidth = topRange + 'px';
            return;
        }
        mid = (bottomRange + topRange) / 2;
        element.style.maxWidth = mid + 'px';

        if (element.clientHeight > originalHeight) {
            // we've squoze too far and element has spilled onto an additional line; recurse on wider range
            squeezeContainer(element, originalHeight, mid+1, topRange);
        } else {
            // element has not wrapped to another line; keep squeezing!
            squeezeContainer(element, originalHeight, bottomRange+1, mid);
        }
    }

    // function to see if a headline is multiple lines
    // we only want to break if the headline is multiple lines
    //
    // We achieve this by turning the first word into a span
    // and then we compare the height of that span to the height
    // of the entire headline. If the headline is bigger than the
    // span by 10px we balance the headline.
    var textElementIsMultipleLines = function (element) {
        var firstWordHeight;
        var elementHeight;
        var HEIGHT_OFFSET;
        var elementWords;
        var firstWord;
        var ORIGINAL_ELEMENT_TEXT;

        ORIGINAL_ELEMENT_TEXT = element.innerHTML;

        // usually there is around a 5px discrepency between
        // the first word and the height of the whole headline
        // so subtract the height of the headline by 10 px and
        // we should be good
        HEIGHT_OFFSET = 10;

        // get all the words in the headline as
        // an array -- will include punctuation
        //
        // this is used to put the headline back together
        elementWords = element.innerHTML.split(' ');

        // make span for first word and give it an id
        // so we can access it in le dom
        firstWord = document.createElement('span');
        firstWord.id = 'element-first-word';
        firstWord.innerHTML = elementWords[0];

        // this is the entire headline
        // as an array except for first word
        //
        // we will append it to the headline after the span
        elementWords = elementWords.slice(1);

        // empty the headline and append the span to it
        element.innerHTML = '';
        element.appendChild(firstWord);

        // add the rest of the element back to it
        element.innerHTML += ' ' + elementWords.join(' ');

        // update the first word variable in the dom
        firstWord = document.getElementById('element-first-word');

        firstWordHeight = firstWord.offsetHeight;
        elementHeight = element.offsetHeight;
        // restore the original element text
        element.innerHTML = ORIGINAL_ELEMENT_TEXT;

        // compare the height of the element and the height of the first word
        return elementHeight - HEIGHT_OFFSET > firstWordHeight;

    } // end headlineIsMultipleLines

        return textBalancer;
})
;
require([
  '_nytg/2017-05-04-autoplay-video/assets',
  '_nytg/2017-05-04-autoplay-video/big-assets',
  'jquery/nyt',
  'underscore/1.6',
  'vhs',
  'foundation/views/page-manager',
  'lib/text-balancer' // uncomment to balance headlines
  // 'd3/3',
  // 'queue/1'
  // 'resizerScript'     // uncomment this line to include resizerScript
  // 'templates'         // uncomment to use src/templates
  // 'laziestloader'
  ], function(NYTG_ASSETS, NYTG_BIG_ASSETS, $, _, VHS, PageManager, balanceText) {

  // begin code for your graphic here:



  var isMobile = PageManager.isMobile(); 

  VHS.config.allowMultiplePlayers = true;

  // add new whitelisted values here — add to the html element to pass through, e.g:
  // data-controls="true" data-autoplay="true"
  // note that $(el).data() automatically camel cases variable names
    //
  var dataWhitelist = [
    'muted',
    'controls', 
    'ratio', 
    'loop', 
    'autoplay', 
    'mp4', 
    'webm', 
    'poster',
    'mutedAutoplay',
    'scoopId',
    'name',
    'env',
    'height',
    'width',
    'duration',
    'newControls'
  ];

  // don't merge these into the VHS options argument
  var ctrlWhitelist = [
    'desktopOnlyAutoplay',
    'autopause'
  ];

  $('.g-video-shell').each(function() {

    var dataProps = _.pick($(this).data(), dataWhitelist);
    var ctrlProps = _.pick($(this).data(), ctrlWhitelist);

    if (ctrlProps.desktopOnlyAutoplay && isMobile) {
      dataProps.autoplay = false;
    }

    console.log(dataProps['ratio'])
      var player = VHS.player(
        _.extend({
          id: dataProps["scoopId"],
          name: "", //required for tracking
          container: $(this), //required
          // don't make an API request if we don't have a scoopID
          api: dataProps["scoopId"] !== '' || dataProps["scoopId"] !== undefined, 
          env: 'production',
          muted:  true,
          autoplay: true,
          controls:  false,
          loop:      true,
          width:     '100%',
          height:    '100%',
          ratio: dataProps['ratio'] || '16:9',
          poster: dataProps["poster"], 
          source: { 
            'video/mp4': dataProps["mp4"],
            'video/webm': dataProps["webm"] 
            }
          }, 
          dataProps));

    if (!isMobile && ctrlProps.autopause !== false) {
    player.ready(function() {
      this.on(VHS.api.events.OUT_VIEWPORT, function() { this.pause()});
      this.on(VHS.api.events.IN_VIEWPORT, function() { this.play()});
      });
    }

  });



  // uncomment to balance headline and leadin
  // balanceText('.interactive-headline, .interactive-leadin');

  // templates
  // var html = Templates.jst.example_template({ text: "yo" });

  // custom sharetools
  // <div class="sharetools g-sharetools" data-url="http://www.nytimes.com" data-title="Custom Title"></div>
  // require(['interactive/main'], function() {
  //   require(['shared/sharetools/views/share-tools-container'], function(ShareTools) {
  //     $(".g-sharetools").each(function() {
  //       new ShareTools({ el: $(this) });
  //     });
  //   });
  // });

}); // end require
;
define("script", function(){});

