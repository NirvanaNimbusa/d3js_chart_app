//tesd data provided;
angApp.constant('data', {'CompanyA':131,'CompanyB':74,'CompanyC':97,});

//load script once in the factory service;
angApp.factory('d3Service', ['$document', '$q', '$rootScope',

    function($document, $q, $rootScope) {
      var d = $q.defer();
      function onScriptLoad() {
        // Load client in the browser
        $rootScope.$apply(function() { d.resolve(window.d3); });
      }
      // Create a script tag with d3 as the source
      // and call our onScriptLoad callback when it
      // has been loaded
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript'; 
      scriptTag.async = true;
      scriptTag.src = 'http://d3js.org/d3.v3.min.js';
      scriptTag.onreadystatechange = function () {
        if (this.readyState == 'complete') onScriptLoad();
      }
      scriptTag.onload = onScriptLoad;
 
      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);
 
      return {
        d3: function() { return d.promise; }
      };
}]);


angApp.controller("chartsCTRL",function ($scope,data,pieChart,columnChart,d3Service) {

			 //load d3 once and response with the promise
			 d3Service.d3().then(function (service) {
			     pieChart.buildPie(service,data);
           columnChart.buildcolumnChart(service,data);
			 });

})