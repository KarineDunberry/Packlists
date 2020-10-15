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
    $(this).popover("show");
    $(this).popover("disable");

  } else {
    $(this).popover("hide");
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
    $(this).popover("show");
    $(this).popover("disable");

  } else {
    $(this).popover("hide");
    clone.attr("id", "");                       
    champTitre.append(titre);
    $("#show-liste").append(clone); //verifier texte popover
    clone.show();
    $("#show-choix").empty();
  }

  $(".item__icone_supprimer").click(supprimerItem);
  $(".item__icone_modifier").click(modifierItem);
}

function enregistrerItem() {
  let nouveauTitre = $(this).parent().siblings(".titre").children(".item__input_nom").val();
  let itemAModifier = $("#target");

  itemAModifier.find(".item__titre").text(nouveauTitre);
  $("#show-choix").empty();
  itemAModifier.attr("id", "");
}

function fermerFenetreChoix() {
  $("#show-choix").empty();
}

function modifierItem() {
  let itemAModifier = $(this).parent().parent().parent();
  let titreCourant = $(this).parent().siblings(".item__titre").text();
  let clone = $("#creer__item_template").clone();
  let input = clone.find(".item__input_nom");
  itemAModifier.attr("id", "target");
  
  $("#show-choix").empty();
  clone.find(".btn__ajout_item").text("Enregistrer");
  input.val(titreCourant);
  $("#show-choix").append(clone);
  clone.show();

  clone.find(".btn-close-item").click(fermerFenetreChoix);
  $(".btn__ajout_item").click(enregistrerItem);
}

function supprimerItem() {
  $(this).parents(".item__onglet").remove();
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
