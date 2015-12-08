var FlashCardApp = {
};

// Dieses Objekt erzeugt für jede Seite (index, manage, learn) eine
// eigenes JavaScript-Objekt. Dies ermöglicht, dass der Seiten-spezifische
// Code in eigenen Objekten organisiert werden kann. Dieser Code muss nicht,
// darf aber natürlich, angepasst werde.
FlashCardApp.Base = function() {
  var context = $('body').data('js-context') || 'undefined';
  switch(context) {
    case 'manage':
      return new FlashCardApp.ManagePage();
    case 'learn':
      return new FlashCardApp.LearnPage();
    case 'start':
      return new FlashCardApp.StartPage();
    default:
      alert('Undefined context: ' + context);
  }
}

// Dieses Objekt nutzt die Lockr-Bibliothek um JavaScript-Objekte
// im Brower-LocalStorage abzuspeichern und wieder auszulesen.
// Alle Seiten-Objekte sollten idealerweise niemals mit dem Lockr-Objekt
// und stattdessen mit dem Persistence-Objekt sprechen.
FlashCardApp.Persistence = {
  getCorrectAnswerCount: function() {
    return Lockr.get('correctAnswerCount', 0);
  },

  getWrongAnswerCount: function() {
    return Lockr.get('wrongAnswerCount', 0);
  },

  incCorrectAnswer: function() {
    return Lockr.set('correctAnswerCount', this.getCorrectAnswerCount() + 1);
  },

  incWrongAnswer: function() {
    return Lockr.set('wrongAnswerCount', this.getWrongAnswerCount() + 1);
  },

  resetAnswerCount: function() {
    Lockr.set('correctAnswerCount', 0);
    Lockr.set('wrongAnswerCount', 0);
    return true;
  },

  // Hier fehlen noch die Lade- und Speicherfunktionen für die Lernkarten
};

// Dies ist ein Beispiel-Objekt für die Startseite. Die Startseite hat
// nicht sehr viel Logik oder Interaktion. Sie zeigt lediglich ein paar
// Informationen aus dem Browser-LocalStorage an.
FlashCardApp.StartPage = function() {
  // So wird bspw. das Persistence-Objekt genutzt um Daten aus dem LocalStorage zu laden
  $('.js-cards-count').html(FlashCardApp.Persistence.getCards().length);
  $('.js-correct-answers-count').html(FlashCardApp.Persistence.getCorrectAnswerCount());
  $('.js-wrong-answers-count').html(FlashCardApp.Persistence.getWrongAnswerCount());
};

FlashCardApp.LearnPage = function() {
  this.confirmButton = $('.js-confirm-button');
  this.confirmButton.on('click', function(event) {
    this.confirmCard();
  }.bind(this));

  // Hier den restlichen Code für die Lern-Seite einfügen.
  // 1. Anzeigen der Lernkarten
  // 2. Umdrehen der Lernkarten
  // 3. "Ja"-, und "Nein"-Knopf-Verhalten
  // … usw.
}

FlashCardApp.ManagePage = function() {
  this.addCardButton = $('.js-add-card-button');
  this.addCardForm = $('.js-add-card-form');
  this.cardsTable = $('.js-cards-table');

  this.addCardButton.on('click', function(event) {
    this.addCardButton.hide();
    this.cardsTable.hide();
    this.addCardForm.show();
  }.bind(this));

  // Hier den restlichen Code für die Verwalten-Seite einfügen
  // 1. Formular für das Anlegen von Lernkarten anzeigen und auswerten
  // 2. Tabellarische Übersicht der aktuellen Lernkarten erzeugen
  // … usw.
};

// Die App wird zum Ende automatisch gestartet
new FlashCardApp.Base();
