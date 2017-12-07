angular.module('todoapp',[])
  .controller('todoController',todoController)
  .directive('noteCreate',noteCreate)
  .directive('addButton',addButton)
  .directive('saveClick',saveClick)
  .directive('noteArea',noteArea)

  
function todoController($scope){
	$scope.noteCount=0;
}  
  
function addButton(){
	return {
		restrict : 'E',
		 scope: {
                noteCount: '='
			 },
		template : '<button class="btn btn-default btn-circle addButton" note-Create>+</button>'
	};
}

function noteArea($compile){
	return {
		restrict : 'E',
		scope: {
          ngModel: '='
        },
		template : '<div class="note"><div class="in"><div class="insidecontainer" ng-model="ngModel"> <span ng-bind="ngModel"></span></div><br><button type="button" class="btn btn-default edit"><span class="glyphicon glyphicon-edit"></span></button><button delete-Click type="button" class="btn btn-default remove"><span class="glyphicon glyphicon-remove"></span></button></div></div>',
		link : function(scope, element, attributes) {
			var btn = $(element).find('.edit');
                btn.on('click', function() {
					var textvalue = scope.ngModel ? scope.ngModel : '';
					var el = $compile('<div class="editContainer"><textarea ng-model="text"  ng-init="text=\''+textvalue+'\'" class="editNote"></textarea><button save-Click class="save">Save</button></div>')(scope);
					console.log(el);
                    $(element).find('.in').replaceWith(el);
                });
			var removebtn = $(element).find('.remove');
                removebtn.on('click', function() {
					$(element).remove();
                });
        }
	};
}

function noteCreate($compile){
	return function(scope, element, attrs){
		element.bind("click", function(){
			angular.element(document.getElementById('contr')).append($compile(
			 '<note-Area></note-Area>')(scope));
		});
	};
}

function saveClick($compile){
	return function(scope, element, attrs){
		element.bind("click", function(){
			var el = $compile('<note-Area ng-model="text"></note-Area>')(scope);
			 $(element.parent().parent()).find('.note').prevObject.replaceWith(el);
		});
	};
}

