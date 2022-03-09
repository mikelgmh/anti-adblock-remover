// ==UserScript==
// @name         Spanish Press anti-adblock blocker
// @run-at        document-start
// @namespace    http://tampermonkey.net/
// @version      0.52
// @description  Elimina los avisos molestos que muestran los periódicos para que desactives adblock. También permite leer artículos de manera ilimitada para algunas páginas.
// @author       Mikel Granero
// @updateURL    https://github.com/mikelgmh/anti-adblock-remover/raw/master/script.user.js
// @include      https://www.elespanol.com/*
// @include      https://elpais.com/*
// @include      https://www.elcorreo.com/*
// @include      https://www.diariovasco.com/*
// @include      https://www.elmundo.es/*
// @include      https://www.telecinco.es/*
// @include      https://www.mediaset.es/*
// @include      https://www.divinity.es/*
// @include      https://www.cuatro.com/*
// @include      https://www.energytv.es/*
// @include      https://www.factoriadeficcion.com/*
// @include      https://www.libertaddigital.com/*
// @include      https://www.diariodenavarra.es/*
// @include      https://www.lasprovincias.es/*
// @include      https://www.eldigitaldealbacete.com/*
// @include      https://www.elnortedecastilla.es/*
// @include      https://www.diariosur.es/*
// @include      https://www.lavozdegalicia.es/*
// @include      https://andaluciainformacion.es/*
// @include      https://www.lavanguardia.com/*
// @include      https://www.elconfidencial.com/*
// @grant        none
// ==/UserScript==

// Una parte del bloqueador de El País y El Mundo son del autor "Zequi"
// https://greasyfork.org/es/scripts/393417-el-pa%C3%ADs-cleaned-page-sin-l%C3%ADmite-de-noticias


//############################//
//      Mini Framework        //
//############################//


Object.assign(Element.prototype, {
    cRemove() { // Custom remove
        try {
            if (this.parentNode !== null) {
                this.parentNode.removeChild(this);
            }
        } catch (error) {
            console.log(error);
        }
    },
    cCrossThis() {
        this.style.cssText = crossedArticleStyle;
    }
});
Object.assign(NodeList.prototype, {
    cRemove() { // Remove multiple elements from NodeList
        this.forEach(element => {
            element.cRemove();
        });
    },
    cRemoveParent(parent) { // Remove all closest parent from every element
        this.forEach(element => {
            element.closest(parent).cRemove();
        });
    },
    cCrossClosestParents(parent) {
        this.forEach(element => {
            element.closest(parent).style.cssText = crossedArticleStyle;
        });
    },
    cCrossParentsWithClass(parentName, className) {
        this.forEach(element => {
            if (element.closest(parentName).classList.includes(className)) {
                element.closest(parentName).style.cssText = crossedArticleStyle;
            }
        });
    },
    cCrossThisWithClassThatContains( className) {
        this.forEach(element => {
            element.classList.forEach(cclass => {
                if (cclass.includes(className)) {
                    element.style.cssText = crossedArticleStyle;
                }
            });
            
        });
    },
    cCrossElementsWithClass(className) {
        this.forEach(element => {
            if (element.classList.includes(className)) {
                element.style.cssText = crossedArticleStyle;
            }
        });
    },
    cCrossThis() {
        this.forEach(element => {
            element.style.cssText = crossedArticleStyle;

        });

    }

});
//############################//
//         VARIABLES          //
//############################//
const paidArticleColor = "#ffa8a8";
const crossedArticleStyle = "background-color: " + paidArticleColor + "; text-decoration: line-through; opacity: 0.7;"

var urlPeriodico = window.location.hostname.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0]; // Elimina http,https,wwww de la url
const fnName = urlPeriodico.substring(0, urlPeriodico.lastIndexOf(".")); // Recoge el nombre del periódico en minúsculas, que es el nombre de las funciones
document.addEventListener("DOMContentLoaded", () => {
    console.log("Starting Switch case");
    switch (urlPeriodico) { // Switch case por si hay que añadir código distinto para cada periódico o hacer modificaciones específicas
        case "elmundo.es":
            elmundo();
            break;
        case "elespanol.com":
            elespanol();
            break;
        case "elpais.com":
            elpais();
            break;
        case "elcorreo.com":
            elcorreo();
            break;
        case "diariovasco.com":
            diariovasco();
            break;
        case "elconfidencial.com":
            elconfidencial();
            break;
        default:
    }
});

async function elconfidencial(){
    document.querySelectorAll("article").cCrossThisWithClassThatContains("--isExclusive");
    document.querySelector(".ph-suscribe-bt").cRemove();
}

async function elmundo() {
    document.querySelectorAll(".ue-c-cover-content__icon-premium").cCrossClosestParents(".ue-c-cover-content__body"); // Tachar los articles premium
}

async function elespanol() {
    document.querySelectorAll(".art--closed").cCrossThis();
    document.querySelector(".msg-footer").cRemove(); // Remove subscription popup
    document.querySelector("#link_bar_top_user_area").cRemove(); // Remove subscription button
}

async function elpais() {
    document.querySelectorAll(".c_k.c_k-s").cCrossClosestParents("article"); // Tachar los articles premium
    document.querySelector("#s_b_df").cRemove(); // Delete the subscription button

}

async function elcorreo() {
    document.querySelectorAll(".sign-on2").cCrossClosestParents("article");
    document.querySelectorAll(".container-onplus-home-bg").cRemove();

}
async function diariovasco() {
    elcorreo();
    await wait(1);
    document.querySelectorAll(".voc-animated-modal-bottom").cRemove();
}

async function wait(seconds) {
    await new Promise(resolve => setTimeout(resolve, seconds * 1000)); // Wait 3 seconds to remove subscription popup
}

function onUrlChange() { // 
    eval(fnName + "()");
}

let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        onUrlChange();
    }
}).observe(document, {
    subtree: true,
    childList: true
});