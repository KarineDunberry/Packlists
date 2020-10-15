/* Template: Evolo - StartUp HTML Landing Page Template
   Author: Inovatik
   Created: June 2019
   Description: Custom JS file
*/


function choisirCategorie() {
  let clone = $("#creer-categorie-template").clone();
  let input = clone.find(".input-nom");
  
  $("#show-choix").empty();
  $("#show-choix").append(clone);
  clone.show();

  clone.find(".btn-close-categorie").click(fermerFenetreChoix);
  $(".btn-creer-onglet").click(creerOngletCategorie);
}

function choisirItem() {
  let clone = $("#creer__item_template").clone();
  let input = clone.find(".item__input_nom");
  
  $("#show-choix").empty();
  $("#show-choix").append(clone);
  clone.show();

  clone.find(".btn-close-item").click(fermerFenetreChoix);
  $(".btn__ajout_item").click(creerOngletItem);
}

function creerOngletCategorie() {
  let clone = $("#creer-onglet-template").clone();
  let titre = $(this).parent().siblings(".titre").find(".input-nom").val(); 
  let couleur = $(".btn-radio-couleur:checked").css("background-color");
  let champTitre = clone.find(".titre-categorie");

  if ((titre == "") || (couleur == undefined)) {
    let clonePopup = $(".popup__validation").clone();

    clonePopup.attr("id", ""); 
    clonePopup.find(".popup_titre").text("Veuillez svp choisir un titre et une couleur.");
    $(".creer__categorie_validation").append(clonePopup);
    clonePopup.show();

    $(".btn__close_popup").click(fermerPopup);

  } else {
    clone.attr("id", "");                       
    clone.css("background-color", couleur);
    champTitre.append(titre);
    $("#show-liste").append(clone);
    clone.show();
    $("#show-choix").empty();
  }

  clone.find(".onglet__btn_item").click(choisirItem);
}

function creerOngletItem() {
  let clone = $("#item__creer_template").clone();
  let titre = $(this).parent().siblings(".titre").find(".item__input_nom").val(); 
  let champTitre = clone.find(".item__titre");

  if (titre == "") {
    let clonePopup = $(".popup__validation").clone();

    clonePopup.attr("id", ""); 
    clonePopup.find(".popup_titre").text("Veuillez svp choisir un titre.");
    $(".creer__item_validation").append(clonePopup);
    clonePopup.show();

    $(".btn__close_popup").click(fermerPopup);

  } else {
    clone.attr("id", "");                       
    champTitre.append(titre);
    $("#show-liste").append(clone);
    clone.show();
    $("#show-choix").empty();
  }

//click des boutons
}

function fermerFenetreChoix() {
  $("#show-choix").empty();
}

function fermerPopup() {
  $(".btn__close_popup").parent().css("display", "none");
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
