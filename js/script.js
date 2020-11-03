/* Template: Evolo - StartUp HTML Landing Page Template
   Author: Inovatik
   Created: June 2019
   Description: Custom JS file
*/
const liste = {};

class Memoire {

  constructor(key) {
      this.store = window.localStorage;
      this.key = key;
  }

  clear() {
      this.store.clear();
  }

  /*
   * @returns Items currently stored
   */
  getItems() {
      return this.store.getItem(this.key);
  }

  sauvegarde() {
    let container = document.getElementById("show-liste");
    let content = container.innerHTML;
    this.store.setItem(this.key, content);
  }
}


const mesListes = new Memoire("listes");




/*FUNCTIONS*/
function choisirCategorie() {
  let clone = $("#creer-categorie-template").clone();
  let input = clone.find(".input-nom");
  
  $("#show-choix").empty();
  $("#show-choix").append(clone);
  clone.show();
  input.focus();

  /*clone.keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);  //fonctionne mais ne trouve pas le titre étant donné que this n'est pas la même chose...
    if(keycode == '13'){
         creerOngletCategorie();  //passer variable titre???
    }
  });*/
  clone.find(".btn-close-categorie").click(fermerFenetreChoix);
  $(".btn-creer-onglet").click(creerOngletCategorie);
  
}

function choisirItem() {
  let clone = $("#creer__item_template").clone();
  let input = clone.find(".item__input_nom");
  let IDcategorie = $(this).parent().parent().attr("id");
  
  $("#show-choix").empty();
  $("#show-choix").append(clone);
  clone.show();
  input.focus();

  clone.find(".btn-close-item").click(fermerFenetreChoix);
  creerOngletItem(IDcategorie);
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
    clone.attr("id", titre);                       
    clone.find(".onglet__cadre_categorie").css("background-color", couleur);
    champTitre.append(titre);
    $("#show-liste").append(clone);
    clone.show();
    $("#show-choix").empty();

    mesListes.clear();
    mesListes.sauvegarde();
  }

  clone.find(".categorie__icone_item").click(choisirItem);
  clone.find(".categorie__icone_supprimer").click(supprimerCategorie);
  clone.find(".categorie__icone_modifier").click(modifierCategorie);
  clone.find(".categorie__icone_dropdown").click(montrerCacherItems);
}

function creerOngletItem(IDcategorie) {
  $(".btn__ajout_item").click(function() {
    let clone = $("#item__creer_template").clone();
    let titre = $(this).parent().siblings(".titre").find(".item__input_nom").val(); 
    let champTitre = clone.find(".item__titre");
    let categorie = $("#" + IDcategorie);
    let couleurCategorie = categorie.find(".onglet__cadre_categorie").css("background-color");
    let checkbox = clone.find(".item__checkbox").prop("checked");

    if (titre == "") {
      $(this).popover("show");
      $(this).popover("disable");

    } else {
      $(this).popover("hide");
      clone.attr("id", "");                       
      champTitre.append(titre);
      categorie.find(".onglet__show_item").append(clone);
      clone.show();
      $("#show-choix").empty();

      mesListes.clear();
      mesListes.sauvegarde();
    }

    $(".item__icone_supprimer").click(supprimerItem);
    $(".item__icone_modifier").click(modifierItem);
  })
}

function enregistrerCategorie() {
  let nouveauTitre = $(this).parent().parent().find(".input-nom").val();
  let categorieAModifier = $("#target");
  let couleurNew = $(".btn-radio-couleur:checked").css("background-color");
  let couleurInitiale = categorieAModifier.find(".onglet__cadre_categorie").css("background-color");
  let titreInitial = categorieAModifier.find(".titre-categorie").text();
  console.log(titreInitial);

  categorieAModifier.find(".onglet__cadre_categorie").css("background-color", couleurNew);
  categorieAModifier.find(".titre-categorie").text(nouveauTitre);
  $("#show-choix").empty();
  categorieAModifier.attr("id", nouveauTitre); 

  mesListes.clear();
  mesListes.sauvegarde();
}

function enregistrerItem(IDcategorie, titreCourant, checkbox) {
  $(".btn__ajout_item").click(function() {
    let nouveauTitre = $(this).parent().siblings(".titre").children(".item__input_nom").val();
    let itemAModifier = $("#target");
    let categorie = $("#" + IDcategorie);
    let titreCategorie = categorie.find(".titre-categorie").text();
    let couleurCategorie = categorie.find(".onglet__cadre_categorie").css("background-color");

    itemAModifier.find(".item__titre").text(nouveauTitre);
    $("#show-choix").empty();
    itemAModifier.attr("id", "");

    mesListes.clear();
    mesListes.sauvegarde();
  });
}

function fermerFenetreChoix() {
  $("#show-choix").empty();
}

function modifierCategorie() {
  let categorieAModifier = $(this).parent().parent(".onglet-template");
  let couleurCourante = $(this).parent(".onglet__cadre_categorie").css("background-color"); //comment cocher la bonne case?
  let titreCourant = $(this).siblings(".titre-categorie").text();
  let clone = $("#creer-categorie-template").clone();
  let input = clone.find(".input-nom");

  categorieAModifier.attr("id", "target");

  $("#show-choix").empty();
  clone.find(".btn-creer-onglet").text("Enregistrer");
 
  input.val(titreCourant);
  $("#show-choix").append(clone);
  clone.show();

  clone.find(".btn-close-categorie").click(fermerFenetreChoix);
  $(".btn-creer-onglet").click(enregistrerCategorie);
}

function modifierItem() {
  let itemAModifier = $(this).parent().parent().parent();
  let titreCourant = $(this).parent().siblings(".item__titre").text();
  let checkbox = itemAModifier.find(".item__checkbox").prop("checked");
  let clone = $("#creer__item_template").clone();
  let input = clone.find(".item__input_nom");
  let IDcategorie = $(this).parents(".onglet-template").attr("id");
  
  itemAModifier.attr("id", "target");
  
  $("#show-choix").empty();
  clone.find(".btn__ajout_item").text("Enregistrer");
  input.val(titreCourant);
  $("#show-choix").append(clone);
  clone.show();

  clone.find(".btn-close-item").click(fermerFenetreChoix);
  enregistrerItem(IDcategorie, titreCourant, checkbox);
}

function montrerCacherItems() {
  let itemContainer = $(this).parent().siblings(".onglet__show_item");
  itemContainer.toggle();
}

function supprimerCategorie() {
  let titre = $(this).siblings(".titre-categorie").text();
  
  $(this).parent().parent().remove();

  mesListes.clear();
  mesListes.sauvegarde();
}

function supprimerItem() {
  let categorieTitre = $(this).parents(".onglet-template").attr("id");
  let categorieCouleur = $(this).parents(".onglet-template").find(".onglet__cadre_categorie").css("background-color");
  let itemTitre = $(this).parents(".item__onglet").find(".item__titre").text();
  let itemCheckbox = $(this).parents(".item__onglet").find(".item__checkbox").prop("checked");

  $(this).parents(".item__onglet").remove();

  mesListes.clear();
  mesListes.sauvegarde();
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

  document.getElementById("show-liste").innerHTML = mesListes.getItems();
  $(".item__icone_supprimer").click(supprimerItem);
  $(".item__icone_modifier").click(modifierItem);
  $(".categorie__icone_item").click(choisirItem);
  $(".categorie__icone_supprimer").click(supprimerCategorie);
  $(".categorie__icone_modifier").click(modifierCategorie);
  $(".categorie__icone_dropdown").click(montrerCacherItems);
  
  $(".onglet__show_item").show();

	$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });

  $(".btn-ajout-categorie").click(choisirCategorie);
  

  $("#sidebar a").click(function() {
    $("#sidebar").toggleClass("active");
  })

  $(".navbar .nav-item").click(function() {
    $('.navbar-toggler').addClass('collapsed');
    $('.navbar-toggler').attr('aria-expanded', false);
    $('.navbar-collapse').removeClass('show'); 
  })


});
