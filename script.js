// ==UserScript==
// @name         Quitar avisos Adblock
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Elimina los avisos de Adblock.
// @author       Mikel Granero
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js

// @include      https://www.elespanol.com/*
// @include      https://elpais.com/*
// @include      https://www.elcorreo.com/*
// @include      https://www.elmundo.es/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    $(document).ready(function () {
        var id = makeid(); // Crea una ID cada vez que se entra en una página para evitar tumbar este script.
        var periodico = window.location.hostname.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]; // Elimina http,https,wwww de la url
        switch (periodico) {
            case "elespanol.com":
                setTimeout(elEspanol, 200);
                setTimeout(elEspanol, 500);
                setTimeout(elEspanol, 900);
                setTimeout(elEspanol, 1400);
                break;
            case "elpais.com":
                setTimeout(elPais, 200);
                setTimeout(elPais, 500);
                setTimeout(elPais, 900);
                setTimeout(elPais, 1400);
                break;
            case "elcorreo.com":
                setTimeout(elCorreo, 200);
                setTimeout(elCorreo, 500);
                setTimeout(elCorreo, 900);
                setTimeout(elCorreo, 1400);
                break;
            case "elmundo.es":
                setTimeout(elMundo, 200);
                setTimeout(elMundo, 500);
                setTimeout(elMundo, 900);
                setTimeout(elMundo, 1400);
                break;
            default:
            // code block
        }

        function elMundo() {
            // CABECERA
            $(".ue-c-seo-links-container").remove();
            // PORTADA
            $(".ue-c-newsletter-widget").remove(); // modulo de newsletter
            //$(".ue-c-cover-content__byline-list").remove(); // nombre del periodista en cada noticia
            $(".ue-c-cover-content__byline-name").remove();
            $(".servicios_vwo").remove(); //módulos de servicios
            $(".ue-c-cover-content__icon-premium").parent().parent().css("background-color", "#edab3b").css("opacity", "0.4"); //marca visualmente las noticias de pago
            // PageNOTICIA > post-CUERPO
            $(".ue-c-article__trust").remove(); // seccion TrustProject
        }

        function elEspanol() {
            // Elimina modales que impiden scroll y que piden desactivar Adblock
            $(".tp-iframe-wrapper").remove();
            $(".tp-iframe-wrapper").remove();
            $(".tp-modal").remove();
            $("#megasuperior").remove(); // Un espacio en blanco enorme que no viene a cuento
        }

        function elCorreo() {
            $(".wrapper voc-story").addClass(id);
            $("." + id).removeClass("wrapper voc-story");
        }

        function elPais() {
            // Trucar el número de noticias gratis por mes
            var aa = JSON.parse(localStorage.getItem('ArcP'));
            aa.anonymous.rc["8"].c = -11;
            localStorage.setItem('ArcP', JSON.stringify(aa));
            // CABECERA
            $(".editions").remove(); //links a otras ediciones/idiomas: inglés/catalán/...
            $(".subscribe").remove(); //botón Subscribirse al lado del botón login
            // PORTADA
            $(".classifieds_widget").remove();  //modulo de publicidad
            $("classifieds_widget").remove();  //modulo de servicios
            // PageNOTICIA > pre-CUERPO
            $(".f_c span.f_a").remove(); //en las imágenes, en el pie de foto se quita nombre del fotógrafo o agencia
            // PageNOTICIA > post-CUERPO
            $(".a_tp").remove(); // seccion TrustProject
            $(".w_h_l").remove(); // en seccion comentarios, eliminar link a "normas"
            $(".divFlex").remove(); // Quitar contador de noticias gratis
        }

        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

    });

})();