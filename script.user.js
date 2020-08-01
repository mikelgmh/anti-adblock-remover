// ==UserScript==
// @name         Quitar avisos Adblock
// @namespace    http://tampermonkey.net/
// @version      0.14
// @description  Elimina los avisos de Adblock.
// @author       Mikel Granero
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @updateURL    https://github.com/mikelgmh/anti-adblock-remover/raw/master/script.user.js
// @include      https://www.elespanol.com/*
// @include      https://elpais.com/*
// @include      https://www.elcorreo.com/*
// @include      https://www.elmundo.es/*
// @include      https://www.telecinco.es/*
// @include      https://www.cuatro.com/*
// @grant        none
// ==/UserScript==

// Una parte del bloqueador de El País y El Mundo son del autor "Zequi"
// https://greasyfork.org/es/scripts/393417-el-pa%C3%ADs-cleaned-page-sin-l%C3%ADmite-de-noticias

(function () {
    'use strict';
    $(document).ready(function () { // Crea una ID cada vez que se entra en una página para evitar tumbar este script.
        var urlPeriodico = window.location.hostname.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]; // Elimina http,https,wwww de la url
        var nombreFn = urlPeriodico.substring(0, urlPeriodico.lastIndexOf("."));
        switch (urlPeriodico) {
            case "elespanol.com":
                runScriptForPage(nombreFn);
                break;
            case "elpais.com":
                runScriptForPage(nombreFn);
                break;
            case "elcorreo.com":
                runScriptForPage(nombreFn);
                break;
            case "elmundo.es":
                runScriptForPage(nombreFn);
                break;
            case "telecinco.es":
                runScriptForPage(nombreFn);
                break;
            case "cuatro.com":
                runScriptForPage(nombreFn);
                break;
            default:
        }

        function runScriptForPage(funcName) {
            setTimeout(eval(funcName + "()"), 200);
            setTimeout(eval(funcName + "()"), 500);
            setTimeout(eval(funcName + "()"), 900);
            setTimeout(eval(funcName + "()"), 1400);
        }


        function elmundo() {
            // GRACIAS A ZEQUI https://greasyfork.org/es/users/413001-zequi
            $(".ue-c-seo-links-container").remove(); // CABECERA
            // PORTADA
            $(".ue-c-newsletter-widget").remove(); // modulo de newsletter
            $(".ue-c-cover-content__byline-name").remove();
            $(".servicios_vwo").remove(); //módulos de servicios
            $(".ue-c-cover-content__icon-premium").parent().parent().css("background-color", "#edab3b").css("opacity", "0.4"); //marca visualmente las noticias de pago
            $(".ue-c-article__trust").remove(); // seccion TrustProject
        }

        function elespanol() {
            // Elimina modales que impiden scroll y que piden desactivar Adblock
            $(".tp-iframe-wrapper").remove();
            $(".tp-modal").remove();
            $("#megasuperior").remove(); // Un espacio en blanco enorme que no viene a cuento
        }

        function elcorreo() {
            var id = makeid(8);
            $(".wrapper voc-story").addClass(id); // Añade id única al wrapper
            $("." + id).removeClass("wrapper voc-story"); // Elimina la clase wrapper para confundir al script
        }

        function telecinco() {
            $("#pageMultisite").remove();
        }

        function cuatro() {
            $("#pageMultisite").remove();
        }

        function elpais() {
            // GRACIAS A ZEQUI https://greasyfork.org/es/users/413001-zequi
            // Trucar el número de noticias gratis por mes
            var aa = JSON.parse(localStorage.getItem('ArcP'));
            aa.anonymous.rc["8"].c = -11;
            localStorage.setItem('ArcP', JSON.stringify(aa));
            // CABECERA
            $(".subscribe").remove(); // Botón Subscribirse al lado del botón login
            // PORTADA
            $(".classifieds_widget").remove();  //modulo de publicidad
            $("classifieds_widget").remove();  //modulo de servicios
            // PageNOTICIA > pre-CUERPO
            $(".f_c span.f_a").remove(); //en las imágenes, en el pie de foto se quita nombre del fotógrafo o agencia
            $(".a_tp").remove(); // seccion TrustProject
            $(".w_h_l").remove(); // en seccion comentarios, eliminar link a "normas"
            $(".divFlex").remove(); // Quitar contador de noticias gratis
        }

        // Esta función es imprescindible para páginas como el correo.
        // Crea una ID única por cada carga de una página para que las páginas no detecten este script.
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