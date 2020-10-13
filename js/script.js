/* Template: Evolo - StartUp HTML Landing Page Template
   Author: Inovatik
   Created: June 2019
   Description: Custom JS file
*/


function choisirCategorie() {
  $("#show-choix-categorie").empty();
  let clone = $("#creer-categorie-template").clone();
  $("#show-choix-categorie").append(clone);
  clone.show();
  $(".btn-close-categorie").click(fermerFenetre);
  $(".btn-creer-onglet").click(creerOngletCategorie);
}

function creerOngletCategorie() {
  let clone = $("#creer-onglet-template").clone();
  let champTitre = clone.find(".titre-categorie");
  let titre = $(this).parent().siblings(".titre").find(".input-nom").val(); //titre ne fonctionne pas
  console.log(titre);
  let couleur = $(".btn-radio-couleur"); //trouver comment aller chercher la couleur
  clone.css("background-color", couleur);
  champTitre.append(titre);

  $("#show-liste").append(clone);
  clone.show();
  $("#show-choix-categorie").empty();
}

function fermerFenetre() {
  console.log("allo");
  $("#show-choix-categorie").empty();
}


$(document).ready(function() {
  "use strict"; 

  var fullHeight = function() {

    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(function(){
      $('.js-fullheight').css('height', $(window).height());
    });

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });

  $(".btn-ajout-categorie").click(choisirCategorie);

 


});