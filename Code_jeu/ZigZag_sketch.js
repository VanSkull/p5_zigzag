//////////////////////////////////////////
//			Le jeu ZigZag				//
// 		par Vanhaecke Valentin			//
//////////////////////////////////////////

// Définition de toutes les variables du jeu
	// Variables de jeu
var play_game;
var pause = false;

	// Variables des élements
var tableau = [];
var diams = [];
var w = 51;
var r = 45;
var txb = 0;
var t = 0;
var relance;
var player;
var verif_rap;
var verif_officiel;

	// Variables des scores
var score_move;
var score_diam;
var score_total;
var highscore;

	// Variables pour la couleur des cellules
var autori_chang = true;
var color_actual;
var change_color;

// Fonction du setup
function setup(){
	createCanvas(800,1280);
	collideDebug(true);			// Fonction de la librairie collide2D pour le type de collision détecté
	reset();
	highscore = 0;				// High score en chargement de la page
}

// Fonction d'interaction avec le clavier  
function keyPressed(){
	if (play_game == 1){
		if (keyCode === 32 && pause == false){		// Déplacement de la boule avec la barre "espace"
			if (txb == 4){
				txb = -4;
				score_move += 1;
				t = 4;
			} else{
				txb = 4;
				score_move += 1;
				t = 4;
			}
		}

		if (keyCode === 80){						// Mettre en pause le jeu avec la touche "p"
			if (pause == false){
				pause = true;
			} else {
				pause = false;
				t = 4;
				relance = score_move % 2;
				if (relance == 0){
					txb = -4;
				} else {
					txb = 4;
				}
			}
		}
	}

	if (play_game == 0){							// Si le jeu est fini,
		if (keyCode === 82){						// réinitialisation du jeu avec la touche "r"
			reset();
		}
	}	
}

// Fonction de rafraîchissement
function draw(){
	background(200);
	translate(width/2, height-100);
	noStroke();
	rectMode(CENTER);

	verif_rap = 0;						// Remise à zéro de la détection de collision des cellules
	change_color = score_total % 50;	// Détection de changement de couleur (tous les 50 points)

	// Changement de couleur aléatoire
	if(pause == false && play_game == 1 && txb != 0 && t != 0 && change_color == 0 && score_total > 0 && autori_chang == true){
		color_actual = color(int(random(255)),int(random(255)),int(random(255)));
		autori_chang = false;
	}

	// Redonner l'autorisation de changement de couleur
	if (change_color != 0 && autori_chang == false){
		autori_chang = true;
	}

	// Affichage des cellules et leur déplacement
	for(var i = 0; i <= 31; i++){
		tableau[i].display();
		tableau[i].collide(player);
		if (pause == false){
			tableau[i].move(t);
		}
	}

	// Repositionnement des cellules
		// Pour la 1er cellule (cellule 0)
	if (tableau[0].positionY() >= 250){
		var ran = random(1);
		if (ran<0.5 && !(tableau[31].positionX() == -350)){
			tableau[0] = new Cellule(tableau[31].positionX()-50, tableau[31].positionY()-50, w);
		} 
		else if(ran<0.5 && (tableau[31].positionX() == -350)){
			tableau[0] = new Cellule(tableau[31].positionX()+50, tableau[31].positionY()-50, w);
		} 
		else if(ran>=0.5 && !(tableau[31].positionX() == 350)){
			tableau[0] = new Cellule(tableau[31].positionX()+50, tableau[31].positionY()-50, w);
		} 
		else if(ran>=0.5 && (tableau[31].positionX() == 350)){
			tableau[0] = new Cellule(tableau[31].positionX()-50, tableau[31].positionY()-50, w);
		}	
	}

		// Pour les autres cellules (de 1 à 31)
	for(var i = 1; i <= 31; i++){
		if (tableau[i].positionY() >= 250){
			var ran = random(1);
			if (ran<0.5 && !(tableau[i-1].positionX() == -350)){
				tableau[i] = new Cellule(tableau[i-1].positionX()-50, tableau[i-1].positionY()-50, w);
			} 
			else if(ran<0.5 && (tableau[i-1].positionX() == -350)){
				tableau[i] = new Cellule(tableau[i-1].positionX()+50, tableau[i-1].positionY()-50, w);
			} 
			else if(ran>=0.5 && !(tableau[i-1].positionX() == 350)){
				tableau[i] = new Cellule(tableau[i-1].positionX()+50, tableau[i-1].positionY()-50, w);
			} 
			else if(ran>=0.5 && (tableau[i-1].positionX() == 350)){
				tableau[i] = new Cellule(tableau[i-1].positionX()-50, tableau[i-1].positionY()-50, w);
			}
		}
	}

	// Définition de la couleur des cellules
	for(var i = 0; i <= 31; i++){
		tableau[i].couleur(color_actual);
	}

	// Affichage du joueur et son déplacement
	player.display();
	if (pause == false){
		player.move(txb);
	}	

	// Repositionnement des bonus (diamants)
	for(var i = 0; i <= 3; i++){
		if (diams[i].veref() || diams[i].positionY() >= 250){
			var rand = int(random(4, 12));
			rand = diams[i].numero() - rand;
			if (rand < 0){
				rand = rand + 31;
			}
			diams[i] = new Bonus(tableau[rand].positionX(), tableau[rand].positionY(), rand);
		}
	}

	// Affichage des diamants et leurs déplacements
	for (var i = 0; i <= 3; i++) {
		diams[i].display();
		diams[i].collide(player);
		if (pause == false){
			diams[i].move(t);
		}		
	}

	// Vérification de la collision des cellules
	for(var i = 0; i <= 31; i++){
		verif_rap += tableau[i].valor();
	}

	// Calcul du score des diamants
	for(var i = 0; i <= 3; i++){
		score_diam += diams[i].score();
	}

	// Taux de tolérance (bug de collision)
	if ((verif_rap == 0) && (t == 4)){
		verif_officiel ++;
	} else{
		verif_officiel = 0;
	}
	
	// Affichage du menu pause
	if(pause == true && play_game == 1){
		t = 0;
		txb = 0;
		push();
		textSize(128);
		fill(0);
		textStyle(BOLD);
		text("Pause", 0, -500);

		textSize(64);
		textStyle(NORMAL);
		text("Rappuyez sur 'p'", 0, -400);
		text("pour reprendre", 0, -350);
		pop();
	}

	// Affichage du menu de départ
	if (txb == 0 && t == 0 && pause == false && play_game == 1 && score_total == 0){
		push();
		textSize(128);
		textStyle(BOLD);
		fill(255, 0, 0);
		text("ZigZag", 0, -550);

		textStyle(NORMAL);
		textSize(64);
		fill(0);
		text("Appuyez sur 'space'", 0, -400);
		text("pour commencer", 0, -350);
		pop();
	}

	// Calcul du score global
	score_total = score_move + score_diam;

	// Remplacement du high score
	if (score_total >= highscore){
		highscore = score_total;
	}

	// Affichage du score global
	if (play_game == 1){
		fill(0);
		text(score_total, 0, -1000);
	}
	
	// Affichage du l'écran de fin
	if (verif_officiel > 1 || play_game == 0){
		t = 0;
		txb = 0;
		play_game = 0;
		player.dead();
		push();
		fill(0);
		textSize(128);
		textStyle(BOLD);
		text("Game Over", 0, -600);

		textStyle(NORMAL);
		textSize(64);
		text("High score : " + highscore, 0, -500);
		text("Score : " + score_total, 0, -430);
		text("Appuyez sur 'r'", 0, -350);
		text("pour recommencer", 0, -300);
		pop();
	}
}

// Function pour remettre à zéro certains paramètres (utile pour le high score)
function reset() {
	play_game = 1;

	// Définition des cellules (Droit à 32 cellules)
		// Pour la 1er cellule (cellule 0)
	tableau[0] = new Cellule(0, 0, w);
	
		// Pour les 5 premières cellules (de 1 à 4)	(pour accueillir le joueur)
	for(var i = 1; i <= 4; i++){
		tableau[i] = new Cellule(tableau[i-1].positionX()+50, tableau[i-1].positionY()-50, w);
	}	
		// Pour les autres cellules (de 5 à 31)	
	for(var i = 5; i <= 31; i++){
		var ran = random(1);
		if (ran<0.5 && !(tableau[i-1].positionX() == -350)){
			tableau[i] = new Cellule(tableau[i-1].positionX()-50, tableau[i-1].positionY()-50, w);
		} 
		else if(ran<0.5 && (tableau[i-1].positionX() == -350)){
			tableau[i] = new Cellule(tableau[i-1].positionX()+50, tableau[i-1].positionY()-50, w);
		} 
		else if(ran>=0.5 && !(tableau[i-1].positionX() == 350)){
			tableau[i] = new Cellule(tableau[i-1].positionX()+50, tableau[i-1].positionY()-50, w);
		} 
		else if(ran>=0.5 && (tableau[i-1].positionX() == 350)){
			tableau[i] = new Cellule(tableau[i-1].positionX()-50, tableau[i-1].positionY()-50, w);
		}
	}
	
	// Définition du joueur
	player =  new Boule(0, 0, r);

	// Définition des bonus (diamants)
	for (var i = 0; i <= 3; i++) {
		var rand = int(random(1, 32))
		diams[i] = new Bonus(tableau[rand].positionX(), tableau[rand].positionY(), rand);
	}
	
	// Couleur des cellules par défaut (blanc)
	color_actual = color(255);

	// Définition du score
	score_move = 0;
	score_diam = 0;
	score_total = score_move + score_diam;
	textAlign(CENTER);
	textStyle(NORMAL);
	textSize(64);
}