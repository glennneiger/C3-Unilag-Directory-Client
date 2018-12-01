$(document).ready(function(){
    console.log('hellooooo');

    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
});