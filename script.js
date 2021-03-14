//Créer une class question
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}
//Tableau d'objets de question
let questions = [
    new Question(
        "Dans Harry Potter qui est Nicolas Flammel ?",
        ["Un directeur de Poudlard", "Un ami de Harry", "Un Mangemort", "Aucune de ces réponses"],
        "Aucune de ces réponses",
    ),
    new Question(
        "Dans quel tome Harry est-il pour la première fois en possession d'un Horcruxe ?",
        ["Les reliques de la mort ", "Le Prince de Sang-Mêlé", "La Chambre des secrets", "La coupe de feu"],
        "La Chambre des secrets",
    ),
    new Question(
        "Quelle est la mascotte de l'école de Quidditch de Bulgarie ?",
        ["Un Troll", "Une Luciole", "Des Vélanes", "Une licorne"],
        "Des Vélanes",
    ),
    new Question(
        "Qui a tué Sirius Black?",
        ["Voldemort","Peter Pettigrow", "Bellatrix Lestrange", "Lucius Malefoy"],
        "Bellatrix Lestrange",
    )
];

console.log(questions);

// Créer une class quizz
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
        
    }
        getCurrentQuestion() {
            return this.questions[this.currentQuestionIndex]
        }
    guess (answer) {
        if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.currentQuestionIndex++ 
    }
    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }  
    
}



//Fonctions d'Affichage de l'appli

const display = {
    elementShown: function(id, text) {
      let element = document.getElementById(id);
      element.innerHTML = text;
    },
    endQuiz: function() {
      endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
      this.elementShown("quiz", endQuizHTML);
    },
    question: function() {
      this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
  
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {
          quiz.guess(guess);
          quizApp();
        }
      }
      // affichage choix + prise en compte du choix
      for(let i = 0; i < choices.length; i++) {
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    progress: function() {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };

    // Logique du jeu

quizApp = () => {
    if (quiz.hasEnded()){
        display.endQuiz();
    }
    else {
        display.question();
        display.choices();
        display.progress();
    }
}
// Lancer le quizz
let quiz = new Quiz(questions);
quizApp();

console.log(quiz);